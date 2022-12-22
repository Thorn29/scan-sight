# ScanSight

A small app that scans images for characters, then converts them to plain text, which the user can copy, edit or save.

[See live demo](https://scansight-hidden-production-19dc.up.railway.app)

## Development

The app was developed using **React** for the frontend, and **Node** & **Express** for the backend, connected to a **PostgreSQL** database. The model it's based on, and which does the conversion is **Clarifai's OCR** (Optical Character Recognition).

Despite being rather small and simple, the app also has authentication, hashed passwords, json web tokens, and ability to pin your converted text and store it in the database.

The app is based on the *SmartBrain* facial recognition app (which you can also find on my GitHub profile), which was originally invented by Andrei Neagoie for his *Zero To Mastery* course on web development.

## Local setup

To set up this app locally, you need to follow several steps:

1. Download the code

2. Import the *scansight.sql* file from the *db_dump* subfolder into your PostgreSQL database

3. Create a *config* folder inside of the *server* subfolder

4. Inside of the *config* folder create a *dev.env* file

5. Inside the *dev.env* file set up *DB_HOST, DB_USER, DB_PASSWORD, DB_NAME* and *JWT_SECRET* variables. The first 4 should correspond to your database credentials, the last one is a jsonwebtoken secret word.

6. Using your terminal, navigate into the *app* subfolder and run *npm install*

7. Using your terminal, navigate into the *server* subfolder and run *npm install*

8. Using your terminal, inside the *server* subfolder, run *npm run dev*

That's it, the app should be up and running!
