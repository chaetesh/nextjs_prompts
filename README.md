
## Demo

https://nextjs-prompts.vercel.app/
# Promptmania 
This project is an open-source prompting tool for modern world to discover, create and share creative prompts.

## Screenshots

![App Screenshot](https://i.ibb.co/0c6yZbb/Whats-App-Image-2023-12-28-at-10-59-16-65edb1a1.jpg)


## Features

- Search for Prompts
- Share Prompts
- Check on others Profiles and their Prompts
## Tech Stack

**Next JS**

## API Reference

#### Create Prompt

```http
  POST https://nextjs-prompts.vercel.app/create-prompt
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userid` | `string` | **Required**. Session userid recieved after login |

#### Get all Prompts

```http
  GET https://nextjs-prompts.vercel.app/api/prompt
```

## Deployment

To deploy this project run

```bash
  npm run deploy
```
