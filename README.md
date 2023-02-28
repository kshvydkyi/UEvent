# Uevent 🎈
This is a service that helps people broaden their horizons and improve their networkingskills. 
## API 🎈
### Endpoints 🎈
<img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/> -- Public\
<img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/> -- For authorized users\
<img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/> -- For the users themselves\
<img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/> -- For Admins
#### - Authentication module 🎈
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/auth/register -- registration of a new user <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/auth/active-email/:token -- active email with a token from email <img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/auth/login -- log in user <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/auth/reset-password -- send a reset link to user email <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/auth/reset-password/:token -- confirm new password with a token from email <img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/>
#### - User module 🎈
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/users -- get all users <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/users/:id -- get specified user data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/users/:token -- create a new user <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/users/avatar/:token -- update user data <img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/users/:id/:token -- update user data <img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/> <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/users/:id/:token -- delete user <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>
#### - Role module
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/roles -- get all roles <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/roles/:id -- get specified role data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/roles/:token -- create a new role <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/roles/:id/:token -- update role data <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/roles/:id/:token -- delete role <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>
#### - Company module
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/companies -- get all companies <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/companies/:id -- get specified company data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/companies/user-companies/:id -- get all specified user companies <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/companies/:token -- create a new company <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/companies/:id/:token -- update company data <img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/> <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/companies/:id/:token -- delete company <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>
#### - Theme module
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/themes -- get all themes <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/themes/:id -- get specified theme data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/themes/:token -- create a new theme <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/themes/:id/:token -- update theme data <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/themes/:id/:token -- delete theme <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>
#### - Format module
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/formats -- get all formats <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/formats/:id -- get specified format data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/formats/:token -- create a new format <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/formats/:id/:token -- update format data <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/formats/:id/:token -- delete format <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>
#### - Event module
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/events -- get all events <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/events/:id -- get specified event data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/events/:token -- create a new event <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/events/add-image/:token -- add a new picture of event <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/events/:id/:token -- update event data <img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/> <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/events/:id/:token -- delete event <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>
#### - Event-item module
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/events-items -- get all events-items <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/events-items/:id -- get specified event-items data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/events-items/:token -- create a new event-item <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/events-items/:id/:token -- update event-item data <img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/> <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/events-items/:id/:token -- delete event-item <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>
#### - Promocode module
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/promocodes -- get all promocodes <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/promocodes/:id -- get specified promocode data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/promocodes/:token -- create a new promocode <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/promocodes/:id/:token -- update promocode data <img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/promocodes/:id/:token -- delete promocode <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>
#### - Comment module
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/comments -- get all comments <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/comments/:id -- get specified comment data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/comments/:token -- create a new comment <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/comments/:id/:token -- update comment data <img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/comments/:id/:token -- delete comment <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>