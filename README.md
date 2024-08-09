# Eggscape

A project created by Jake Darby, Richard Goodacre and Theo Reeves

## Vercel Link

https://video-media-app.vercel.app/

## Porject Repo

https://github.com/Jakkers/video-media-app

## Problem domain

The user needs a platform to find and share movies, with a gamified element that helps build their profile and makes the user experience fun.

## User stories (MVP)

As a user, I would like to be able to find movies via catagory.
As a user, I would like to share comments on the movie page.
As a user, I would like to be able to log in to my profile.
As a user, I would like to be able to view a trailer.
As a user, I would like to be able to view movie information.
As a user, I would like to be able to use the app on a variety of devices.

## Stretch user stories

As a user, I would like to share movie comments on my profile and have other people visit and visit other peoples.
As a user, I would like the gamified element to have achievements, a sense of humour and badges to display on profile. (Consider using toast component)
As a user, I would like to have my content dynamically showed to me to make suggestions for movies that I like. (Recommendations)
As a user, I would like to see a list of what’s currently popular or new.

## Wireframes

![wireframe Desktop](https://media.discordapp.net/attachments/1245025828329357403/1268870332261863477/Screenshot_2024-08-02_at_10.56.20.png?ex=66b5e815&is=66b49695&hm=19aad4cac69408de4dd94d3b9e868c912e99810919a4bc17c22e14a910dec427&=&format=webp&quality=lossless&width=1774&height=1170)
![review and edit page wireframe mobile](https://media.discordapp.net/attachments/1245025828329357403/1268870332589015110/Screenshot_2024-08-02_at_10.56.29.png?ex=66b5e815&is=66b49695&hm=c1752eb003217dd1e4cda9cb041c3ffb1658890d7b525da1ea887467a855feb7&=&format=webp&quality=lossless&width=1598&height=1170)
![category page and profile page wireframe mobile](https://media.discordapp.net/attachments/1245025828329357403/1268870332941598812/Screenshot_2024-08-02_at_10.56.40.png?ex=66b5e815&is=66b49695&hm=356c6211d53b2eaf49de0d65542d9a586ef416fe473b918a3c514f0ab3a7f504&=&format=webp&quality=lossless&width=1576&height=1170)
![Home screen and Movie page wireframe mobile](https://media.discordapp.net/attachments/1245025828329357403/1268870333306372128/Screenshot_2024-08-02_at_10.56.50.png?ex=66b5e815&is=66b49695&hm=c427eeb406e2bb793ba08fbc8250c959b54de71416e1673a11df58d7fdd03c98&=&format=webp&quality=lossless&width=1482&height=1170)
![Homescreen/Log-In wireframe mobile](https://media.discordapp.net/attachments/1245025828329357403/1268870333612425296/Screenshot_2024-08-02_at_10.56.56.png?ex=66b5e816&is=66b49696&hm=90774246eee6023f23f11ccce09ce1c33f273948628fd2c7bd9fe5fc7b5ccfb7&=&format=webp&quality=lossless&width=996&height=1170)

## Database Schema

![DrawSql Schema](https://cdn.discordapp.com/attachments/1245025828329357403/1271156098040074400/Screenshot_2024-08-08_at_18.20.26.png?ex=66b64fde&is=66b4fe5e&hm=0525a2c673bd88eeeb5d66e7add4200d8a481bf793e6947a38530b679a36cca8&)

## Lighthouse Report Score

![Lighthouse Score](https://cdn.discordapp.com/attachments/1245025828329357403/1270786947945857024/Screenshot_2024-08-07_at_17.53.04.png?ex=66b64992&is=66b4f812&hm=b8d0c3ffc97d15278bdf4b08fe5f2d5d3d22daa3f0792f6890401b4adf208473&)

## API

https://www.themoviedb.org/?language=en-GB

## Reflections

- Components are split up, rather than long page.js returns everything
- Also CSS pseudos and implemented Tailwind
- Fully functional on mobile
- Added additional accessibility features, tab navigation and aria labeling
- Well planned excellent UI
- Lighthouse scores above 90%
- Very sensible code: comments to explain decisions & evidence of refactoring to reduce repetition and aid readability
- Relational tables with foreign keys and full CRUD implementation
- User id used in app to associate data with users
- Forms have validation features to enforce data requirements and inform user
- Uses let /const, arrow functions, template literals and Typescript
- Use of a third party libary - eg Radix, MUI, framer motion or other
- And uses query strings for filtering, or sorting, or searching etc.
- Manage state concisely using objects useState and passing props
- Active and engaged and supportive and asking for and giving help...

Please also provide an assignment reflection in your project README.md file.
(Required)
🎯 Please mention the requirements you met and which goals you achieved for this assignment.

🎯 Were there any requirements or goals that you were not quite able to achieve?

🎯 If so, could you please tell us what was it that you found difficult about these tasks?

(Optional)
🏹 Feel free to add any other reflections you would like to share about your submission e.g.

What went really well and what could have gone better?
Detailing useful external sources that helped you complete the assignment (e.g Youtube tutorials).
Describing errors or bugs you encountered while completing your assignment.
Requesting feedback about a specific part of your submission.
