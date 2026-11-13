# Zoom Video SDK UI Toolkit React official sample

A React app that shows the prebuilt meeting UI and the individual toolkit components you can customize.

Use of this sample app is subject to our [Terms of Use](https://www.zoom.com/en/trust/video-sdk-terms/).

## Prerequisites

- Node.js 22.13 or newer
- A Zoom Video SDK key and secret

## Installation

Clone this repository, then install its dependencies in the repository root:

```bash
npm install
```

## Setup

### Auth server

This sample gets its session token from an auth server. For local development, run Zoom's
[Video SDK auth endpoint sample](https://github.com/zoom/videosdk-auth-endpoint-sample): clone it, rename
`.env.example` to `.env`, set `ZOOM_VIDEO_SDK_KEY` and `ZOOM_VIDEO_SDK_SECRET`, then run `npm install` and
`npm run start`. It listens on `http://localhost:4000`, which is this sample's default auth endpoint.

### Configuration

Edit `src/config.ts`:

| Setting                                | What it does                                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `authEndpoint`                         | Your auth server's URL. Defaults to `http://localhost:4000`.                                           |
| `webEndpoint`                          | Zoom web domain passed to the SDK's `init()`. Keep `zoom.us` unless your account uses a different one. |
| `topic`, `userName`, `sessionPassword` | Prefill the session name, display name, and password fields.                                           |
| `role`                                 | Default role in the form: `1` for host, `0` for user.                                                  |

The SDK loads its files from Zoom's CDN: `init()` in `src/App.tsx` passes `'Global'`. If your users include people in
China, pass `'CDN'` instead; if all your users are in China, pass `'CN'`.

## Usage

```bash
npm run dev
```

Open http://localhost:3000. Enter a session name and display name, choose **Host** or **User**, then click
**Join session**. Use **App** for the complete meeting UI, or **Components** to choose and customize individual
controls.

## Need help?

If you're looking for help, try [Developer Support](https://developers.zoom.us/support/) or our
[Developer Forum](https://devforum.zoom.us). Priority support is also available with
[Premier Developer Support](https://explore.zoom.us/docs/en-us/developer-support-plans.html) plans.
