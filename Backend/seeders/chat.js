
import { faker, simpleFaker } from "@faker-js/faker";
import { Chat } from "../Models/ChatSchema.js";
import {Message}  from "../Models/MessageSchema.js";
import Patient  from "../Models/PaitentSchema.js";

const createSingleChats = async (numChats) => {
  try {
    const Patients = await Patient.find().select("_id");

    const chatsPromise = [];

    for (let i = 0; i < Patients.length; i++) {
      for (let j = i + 1; j < Patients.length; j++) {
        chatsPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [Patients[i], Patients[j]],
          })
        );
      }
    }

    await Promise.all(chatsPromise);

    console.log("Chats created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createGroupChats = async (numChats) => {
  try {
    const Patients = await Patient.find().select("_id");

    const chatsPromise = [];

    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: Patients.length });
      const members = [];

      for (let i = 0; i < numMembers; i++) {
        const randomIndex = Math.floor(Math.random() * Patients.length);
        const randomPatient = Patients[randomIndex];

        // Ensure the same Patient is not added twice
        if (!members.includes(randomPatient)) {
          members.push(randomPatient);
        }
      }

      const chat = Chat.create({
        groupChat: true,
        name: faker.lorem.words(1),
        members,
        creator: members[0],
      });

      chatsPromise.push(chat);
    }

    await Promise.all(chatsPromise);

    console.log("Chats created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createMessages = async (numMessages) => {
  try {
    const Patients = await Patient.find().select("_id");
    const chats = await Chat.find().select("_id");

    const messagesPromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomPatient = Patients[Math.floor(Math.random() * Patients.length)];
      const randomChat = chats[Math.floor(Math.random() * chats.length)];

      messagesPromise.push(
        Message.create({
          chat: randomChat,
          sender: randomPatient,
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagesPromise);

    console.log("Messages created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createMessagesInAChat = async (chatId, numMessages) => {
  try {
    const Patients = await Patient.find().select("_id");

    const messagesPromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomPatient = Patients[Math.floor(Math.random() * Patients.length)];

      messagesPromise.push(
        Message.create({
          chat: chatId,
          sender: randomPatient,
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagesPromise);

    console.log("Messages created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export {
  createGroupChats,
  createMessages,
  createMessagesInAChat,
  createSingleChats,
};
