const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
app.use(express.static(__dirname + '/src'));

const User = require('./models/user');
const Event = require('./models/events');
const Vehicle = require('./models/vehicle');
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id:ID!
            title:String!
            description:String!
            date: String!
            from:String!
            to:String!
            vehicle:Vehicle!
            creator:User!
        }

        type User {
          _id:ID!
          username: String!
          description:String!
          password: String
          createdEvents:[Event!]
        }

        type Vehicle{
          _id:ID!
          name:String!
          vehicleNumber:Int!
        }

        input EventInput {
            title:String!
            description:String!
            date: String!
            from: String!
            to: String!
        }

        input UserInput{
          username: String!
          password:String!
          description:String!
        }

        input VehicleInput{
          name:String!
          vehicleNumber:Int!
        }

        type RootQuery{
            events:[Event!]!
        }
        type RootMutation{
            createEvent(eventInput:EventInput):Event
            createUser(userInput:UserInput):User 
            createVehicle(vehicleInput:VehicleInput):Vehicle 
        }
        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
        .populate('creator')
        .then(events=>{
          return events.map(event=>{
            return {
              ...event._doc,
              _id:event.id,
              creator:{
              ...event._doc.creator._doc,
              _id:event._doc.creator.id
            }};
          });
        })
        .catch(err=>{
          throw err;
        })
      },
      createEvent: (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          from: args.eventInput.from,
          to: args.eventInput.to,
          date: new Date(args.eventInput.date),
          creator:'5ec1b4f13770aa4dd0f4af3b'
        });
        let createdEvent;
        return event.save()
        .then(result=>{
          createdEvent={...result._doc,_id:result._doc._id.toString()}
          return User.findById('5ec1b4f13770aa4dd0f4af3b')
        }).then(user=>{
          if(!user){
            throw new Error('User not found');
          }
          user.createdEvents.push(event);
          return user.save();
        })
        .then(result=>{
          return createdEvent;
        })
        .catch(err=>{
          console.log("err"+err);
          throw err;
        });
      },
      createUser:args=>{
       return User.findOne({username:args.userInput.username})
        .then(user=>{
          if(user){
            throw new Error('User exists already.');
          }
          return bcrypt.hash(args.userInput.password,12)
        })
        .then(hashedPassword=>{
          const user = new User({
            username: args.userInput.username,
            description: args.userInput.description,
            password: hashedPassword
          });
          return user.save();
        })
        .then (result=>{
          return {...result._doc, _id:result.id}
        })
        .catch(err=>{
          throw err;
        });
        
      },
      createVehicle:(args)=>{
        const vehicle = new Vehicle({
          name: args.vehicleInput.name,
          vehicleNumber: args.vehicleInput.vehicleNumber,
        });
        return vehicle.save().then(result=>{
          return {...result._doc,_id:result._doc._id.toString()
          };
        })
        .catch(err=>{
          console.log("err"+err);
          throw err;
        });
      }

    },
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-vfvj4.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });