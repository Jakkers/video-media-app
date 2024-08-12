# Eggscape

A project created by Jake Darby, Richard Goodacre and Theo Reeves

## Vercel Link

https://video-media-app.vercel.app/

## Porject Repo

https://github.com/Jakkers/video-media-app

## Problem domain

The user needs a platform to find and share movies, with a gamified element that helps build their profile and makes the user experience fun.

## User stories (MVP)

- As a user, I would like to be able to find movies via catagory.
- As a user, I would like to share comments on the movie page.
- As a user, I would like to be able to log in to my profile.
- As a user, I would like to be able to view a trailer.
- As a user, I would like to be able to view movie information.
- As a user, I would like to be able to use the app on a variety of devices.

## Stretch user stories

- As a user, I would like to share movie comments on my profile and have other people visit and visit other peoples.
- As a user, I would like the gamified element to have achievements, a sense of humour and badges to display on profile. (Consider using toast component)
- As a user, I would like to have my content dynamically showed to me to make suggestions for movies that I like. (Recommendations)
- As a user, I would like to see a list of what’s currently popular or new.

## Wireframes

![wireframe Desktop](/public/DesktopMediaApp.png)
![review and edit page wireframe mobile](/public/ReviewPage.png)
![category page and profile page wireframe mobile](/public/CategoryPage.png)
![Home screen and Movie page wireframe mobile](/public/HomeScreen.png)
![Homescreen/Log-In wireframe mobile](/public/sign-in.png)

## Database Schema

![DrawSql Schema](/public/drawsql.png)

## Lighthouse Report Score

![Lighthouse Score](/public/lighthouse.png)

## API

https://www.themoviedb.org/?language=en-GB

## Project Presentation

https://docs.google.com/presentation/d/17YGRm_8CYNRWEJQ0DMdwBdN-x4TLj2xfAODfIt-uf6s/edit?usp=sharing

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
