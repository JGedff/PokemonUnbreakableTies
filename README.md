# Pokemon Unbreakable Ties
This project is a website inspired by the fangame "Pokémon Unbreakable Ties", made with HTML, CSS and JavaScript connected to Firebase.

Before starting, you must make some changes in the files:
  - In the index.html file, int he last function "staticImg()" you'll have to change the local rute of the local image and change it to the URL of a file from the Storage of the Firebase.
  - In the js/config.js file, in the function firebase.initializeApp({ you must put the data that is requested.
  - In the items.js file you must change the statements "...db.collection();" and put the name of the firebase collections in quotes inside the parentheses.
  - You will need to create a user and give it the uid "5tPRFSHStdgnEYMPLTngAbep1673". The user registered in the database with this uid will be the administrator user.
  - In the collection of categories, you must create a document with the id "APqcql5Nzdv0DItyo1NT". This document will ensure that the collection is not deleted in the case of not having any documents, as it will not be displayed at any time.
  - In the user collection, you will need to create a document with the id "ytjjkRqzRcwSz5xSNcKM". This document will ensure that the users collection is not deleted in the case of having no document, as it should not be displayed at any time.
  - In the collection of publications, you will have to create a document with the id "vtJrDcKOBi9HEgMKoYX2" for the same reason as in the previous cases.
  - In the comments collection, you will need to create a document with the id "I4OCfTIRdQzyuEXSrnQn" for the same reason as in the previous cases.


Finally, before I explain what can be done on the web, I must inform you that deleting users does not work at all:
  - Deletes your comments and posts, also deletes your profile document, but doesn't delete your Firebase authentication.
 

To improve:
  - Refactoring / Rename reiterative variables and in different languages.
  - As an UNREGISTERED user:
  - HTML / CSS improvement
  - Lack of persistence of likes and dislikes.
  - When a publication or comment is edited, show a text "(edited)" so that other users know that the publication or comment has been edited.
  - When a publication or comment is edited, show which user has edited the text.
  - Profile editor.
  - Profile remover.
  - Creation and management of secrets to be able to delete profiles.


What can be done:
  - As an UNREGISTERED user:
      + See the "Game", "Forum" and "FAQs" section
      + In the "Forum" section you can only look. You can neither create comments, nor like comments or posts
      + You can search for one or several publications according to their title, their content by writing how it begins
      + You can search for one or several publications according to their category, choosing one of the categories that appear in the dropdown
      + You can search for one or several publications according to the number of likes, dislikes or number of comments indicating if it is greater than, greater than or equal to, equal to, less than or equal to or less than a number that you write
      + You can sort the posts by title, post content, category name, number of likes, dislikes or number of replies.
  
  - As a REGISTERED user:
      + Can create posts
      + Can create comments
      + You can like or dislike a comment or post
      + Can edit or delete a comment or post created by the same user
      + You can see his profile
      + You can enter the "Users" section, which lists all the users registered in the database who have a document in the user collection
      + You can search for one or several users based on how their email begins, their username or their description
      + You can search for one or several users according to the amount of accumulated likes, accumulated dislikes, posts created and comments made
      + You can sort users according to their email, username, description, number of posts created, number of comments made, number of accumulated likes or dislikes.

  - As admin user / user with id "ytjjkRqzRcwSz5xSNcKM"
      + Can create and delete categories
      + Can edit ALL comments, posts and user profiles
      + Can delete ALL comments, posts and user profiles
   
  
 Any changes to improve, if you liked it or if you didn't like it, please contact me.
