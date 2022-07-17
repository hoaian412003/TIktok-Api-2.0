##### Tiktok api 2.0 is project simulation of server of tiktok. That mean it can do every thing Tiktok's backend can do.

## Package
* [Nodejs](https://nodejs.org/en/download/): Javascript development
* [express.js](https://www.npmjs.com/package/express): Backend framework base on nodejs
* [cors](https://www.npmjs.com/package/cors): Handle access-control-allow-origin for server
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Handle jwt authorization for backend
* [multer](https://www.npmjs.com/package/multer): File middleware for express.js
* [bcrypt](https://www.npmjs.com/package/bcrypt): Help to hash and decode password of user
* [sequelize](https://www.npmjs.com/package/sequelize): ORM base on Nodejs use to connect with postgresql
* [pg](https://www.npmjs.com/package/pg) and [pg-hstore](https://www.npmjs.com/package/pg-hstore): Package require for connect to postgresql
* [nodemon](https://www.npmjs.com/package/nodemon): Hot reload for dev
* [dotenv](https://www.npmjs.com/package/dotenv): Read developement variable

## Require
* [Nodejs](https://nodejs.org/en/download/): Nodejs development
* [npm](https://nodejs.org/en/download/): package magnament for install nodejs

## Start up project in localhost
* Install [ nodejs and npm ]()
* Install package
```
npm run install
```
* Fill file .github.env and rename to file .env
* Run project
```
npm run dev
```
* If startup sucess you will see log:
```
Connect to postgresql sucessfully
Tiktok api is connecting on PORT 4000
```
* Url for call api is [ http://localhost:4000 ](http://localhost:4000)

## Api refrences

#### Authentication api
<details>
<summary><span style="font-weight:bold"> Register <span></summary>
Request:

```http
Route: /register
Method: POST
Headers: 
    Content-Type: application/x-www-form-urlencoded
Data: 
    username: string
    password: string
    nickname: string
    description: string
``` 
Respone:
```json
{
    "userId": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
    "username": "Testing_username",
    "nickname": "Testing_nickname",
    "password": "$2b$11$iAwj9pE7nSb5BQOusi8a1u2Dy3JOJnXN8I61ic3TuttAEuREINmkW",
    "description": "Testing_description",
    "updatedAt": "2022-07-17T05:40:40.276Z",
    "createdAt": "2022-07-17T05:40:40.276Z"
}
```
</details>

<details>
<summary><span style="font-weight:bold"> Login <span></summary>

Request:
```http
Route: /login
Method: POST
Headers:
    Content-Type: application/x-www-form-urlencoded
Data: 
    username: string
    password: string
```
Respone:
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiVGVzdGluZ191c2VybmFtZSIsIm5pY2tuYW1lIjoiVGVzdGluZ19uaWNrbmFtZSIsInVzZXJJZCI6ImEwOTBjMWMxLWE4YmYtNGNlMi1hYmUxLTAzM2YzZTZmZWY0MCJ9LCJpYXQiOjE2NTgwMzY0NjcsImV4cCI6MTY1ODA0MDA2N30.9jseXgRSuKwtvMD54PomrEulvaQZsG9dE6Bm6MWGkjE",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiVGVzdGluZ191c2VybmFtZSIsIm5pY2tuYW1lIjoiVGVzdGluZ19uaWNrbmFtZSIsInVzZXJJZCI6ImEwOTBjMWMxLWE4YmYtNGNlMi1hYmUxLTAzM2YzZTZmZWY0MCJ9LCJpYXQiOjE2NTgwMzY0NjcsImV4cCI6MTY4OTU3MjQ2N30.OCRF2Qi_u5r0FhbAZryVvgmxtRSnv8bmttGqcs3DrWg"
}
```
</details>


<details>
<summary><span style="font-weight:bold"> Refresh access_token <span></summary>

Request:
```http
Route: /login
Method: GET
Query: 
    refresh_token: string
```
Respone:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiVGVzdGluZ191c2VybmFtZSIsIm5pY2tuYW1lIjoiVGVzdGluZ19uaWNrbmFtZSIsInVzZXJJZCI6ImEwOTBjMWMxLWE4YmYtNGNlMi1hYmUxLTAzM2YzZTZmZWY0MCJ9LCJpYXQiOjE2NTgwMzY1NjUsImV4cCI6MTY1ODA0MDE2NX0.A3NDN2PS_vFWzVmONE-JhLdLX88ccFeVJhzbfTMtM2c"
}
```
</details>

#### User api

<details>
<summary><span style="font-weight:bold"> Get user account infomation after logged <span></summary>

Request:
```http
Route: /user/me
Method: GET
Headers: 
    Authorization: Bearer <access_token>
```
Respone:
```json
{
    "userId": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
    "username": "Testing_username",
    "nickname": "Testing_nickname",
    "password": "$2b$11$iAwj9pE7nSb5BQOusi8a1u2Dy3JOJnXN8I61ic3TuttAEuREINmkW",
    "description": "Testing_description",
    "createdAt": "2022-07-17T05:40:40.276Z",
    "updatedAt": "2022-07-17T05:40:40.276Z",
    "followerCount": "0",
    "followingCount": "0",
    "image": {
        "imageId": "aeaebd77-f7e6-40a6-8ec1-e639252b209b",
        "url": "http://localhost:4000/image/aeaebd77-f7e6-40a6-8ec1-e639252b209b/view",
        "createdAt": "2022-07-17T05:43:45.352Z",
        "updatedAt": "2022-07-17T05:43:45.352Z",
        "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40"
    }
}
```
</details>

<details>
<summary><span style="font-weight:bold"> Get user's infomation based on userId <span></summary>

Request:
```http
Route: /user/:userId
Method: GET
Params: 
    userId: uuid
```
Respone:
```json
{
    "userId": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
    "username": "Testing_username",
    "nickname": "Testing_nickname",
    "password": "$2b$11$iAwj9pE7nSb5BQOusi8a1u2Dy3JOJnXN8I61ic3TuttAEuREINmkW",
    "description": "Testing_description",
    "createdAt": "2022-07-17T05:40:40.276Z",
    "updatedAt": "2022-07-17T05:40:40.276Z",
    "followerCount": "0",
    "followingCount": "0",
    "image": {
        "imageId": "aeaebd77-f7e6-40a6-8ec1-e639252b209b",
        "url": "http://localhost:4000/image/aeaebd77-f7e6-40a6-8ec1-e639252b209b/view",
        "createdAt": "2022-07-17T05:43:45.352Z",
        "updatedAt": "2022-07-17T05:43:45.352Z",
        "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40"
    }
}
```
</details>

<details>
<summary><span style="font-weight:bold"> Search user by username or nickname <span></summary>

Request:
```
Route: /user/search
Method: GET
Query:
    keyword: string
```
Respone:
```
[
    {
        "userId": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
        "username": "Testing_username",
        "nickname": "Testing_nickname",
        "description": "Testing_description",
        "createdAt": "2022-07-17T05:40:40.276Z",
        "updatedAt": "2022-07-17T05:40:40.276Z",
        "followerCount": "0",
        "followingCount": "0",
        "image": {
            "imageId": "aeaebd77-f7e6-40a6-8ec1-e639252b209b",
            "url": "http://localhost:4000/image/aeaebd77-f7e6-40a6-8ec1-e639252b209b/view",
            "createdAt": "2022-07-17T05:43:45.352Z",
            "updatedAt": "2022-07-17T05:43:45.352Z",
            "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40"
        }
    }
]
```
</details>

<details>
<summary><span style="font-weight:bold"> Update user <span></summary>

Request:
```http
Route: /user/me
Method: PUT
data: 
    username: string
    password: string
    nickname: string
    description: string
```
Respone:
```
updated
```
</details>

<details>
<summary><span style="font-weight:bold"> Delete user by userId <span style = "color:red"> Update later </span> <span></summary>
</details>

#### Video api

<details>
<summary><span style="font-weight:bold"> Create Video </summary>

Request: 
```http
Route: /video
Method: POST
Headers:
    Authorization: Bearer <access_token>
    Content-Type: multipart/form-data
data: 
    file: video/mp4 type
    description: string
```
Respone:
```json
{
    "videoId": "d75f06ab-9416-4314-9785-fa9ef119314e",
    "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
    "description": "Thi is test video",
    "updatedAt": "2022-07-17T05:47:28.914Z",
    "createdAt": "2022-07-17T05:47:28.914Z",
    "url": "http://localhost:4000/video/d75f06ab-9416-4314-9785-fa9ef119314e/view"
}
```
</details>

<details>
<summary><span style="font-weight:bold"> Get video info by videoId </summary>

Request:
```http
Route: /video/:videoId
Method: GET
Params:
    userId: uuid
```
Respone:
```json
{
    "videoId": "e3492006-263f-4c15-b5c3-9fa745eb215b",
    "description": "Test video",
    "url": "http://localhost:4000/video/e3492006-263f-4c15-b5c3-9fa745eb215b/view",
    "createdAt": "2022-07-17T05:21:48.316Z",
    "updatedAt": "2022-07-17T05:21:48.316Z",
    "owner": "f88f1e00-73ba-40a0-8a19-d4bb99fe4459",
    "likeCount": "1",
    "user": {
        "userId": "f88f1e00-73ba-40a0-8a19-d4bb99fe4459",
        "username": "hoaian412003",
        "nickname": "Tran Hoai An",
        "description": null,
        "createdAt": "2022-07-16T14:53:00.661Z",
        "updatedAt": "2022-07-17T05:09:38.863Z",
        "image": {
            "imageId": "deffddc1-6859-4660-a162-4c0c0d205207",
            "url": "http://localhost:4000/image/deffddc1-6859-4660-a162-4c0c0d205207/view",
            "createdAt": "2022-07-16T14:56:14.628Z",
            "updatedAt": "2022-07-16T14:56:14.628Z",
            "owner": "f88f1e00-73ba-40a0-8a19-d4bb99fe4459"
        }
    }
}
```
</details>

<details>
<summary><span style="font-weight:bold"> Delete video by videoId </summary>

Request:
```http
Route: /video/:videoId
Method: DELETE
Params: 
    videoId: uuid
Headers: 
    Authorization: Bearer <access_token>
```
Respone:
```json
deleted
```
</details>

<details>
<summary><span style="font-weight:bold"> Get video of user loged </summary>

Request:
```http
Route: /videos
Method: GET
Headers: 
    Authorization: Bearer <access_token>
```
Respone:
```json
[
    {
        "videoId": "0f6971a9-36ed-4fdf-a2fd-b9b0921b7f63",
        "description": "Test video",
        "url": "http://localhost:4000/video/0f6971a9-36ed-4fdf-a2fd-b9b0921b7f63/view",
        "createdAt": "2022-07-17T05:59:03.571Z",
        "updatedAt": "2022-07-17T05:59:03.571Z",
        "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
        "likeCount": "1",
        "user": {
            "userId": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
            "username": "Testing_username",
            "nickname": "Testing_nickname",
            "description": "Testing_description",
            "createdAt": "2022-07-17T05:40:40.276Z",
            "updatedAt": "2022-07-17T05:40:40.276Z",
            "image": {
                "imageId": "aeaebd77-f7e6-40a6-8ec1-e639252b209b",
                "url": "http://localhost:4000/image/aeaebd77-f7e6-40a6-8ec1-e639252b209b/view",
                "createdAt": "2022-07-17T05:43:45.352Z",
                "updatedAt": "2022-07-17T05:43:45.352Z",
                "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40"
            }
        }
    },
    {
        "videoId": "bf784526-5d25-4f1c-a8e4-cf222692dcf9",
        "description": "Test video",
        "url": "http://localhost:4000/video/bf784526-5d25-4f1c-a8e4-cf222692dcf9/view",
        "createdAt": "2022-07-17T05:59:04.311Z",
        "updatedAt": "2022-07-17T05:59:04.311Z",
        "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
        "likeCount": "1",
        "user": {
            "userId": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
            "username": "Testing_username",
            "nickname": "Testing_nickname",
            "description": "Testing_description",
            "createdAt": "2022-07-17T05:40:40.276Z",
            "updatedAt": "2022-07-17T05:40:40.276Z",
            "image": {
                "imageId": "aeaebd77-f7e6-40a6-8ec1-e639252b209b",
                "url": "http://localhost:4000/image/aeaebd77-f7e6-40a6-8ec1-e639252b209b/view",
                "createdAt": "2022-07-17T05:43:45.352Z",
                "updatedAt": "2022-07-17T05:43:45.352Z",
                "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40"
            }
        }
    }
]
```
</details>

<details>
<summary><span style="font-weight:bold"> Get user's liked video</summary>

Request:
```http
Route: /videos/like
Method: GET
Headers: 
    Authorization: Bearer <access_token>
```
Respone:
```json
[
    {
        "video": {
            "videoId": "8bbfed25-3a5f-4041-8500-a40600a2875c",
            "description": "Thi is test video",
            "url": "http://localhost:4000/video/8bbfed25-3a5f-4041-8500-a40600a2875c/view",
            "createdAt": "2022-07-16T14:56:23.753Z",
            "updatedAt": "2022-07-16T14:56:23.753Z",
            "owner": "f88f1e00-73ba-40a0-8a19-d4bb99fe4459",
            "user": {
                "userId": "f88f1e00-73ba-40a0-8a19-d4bb99fe4459",
                "username": "hoaian412003",
                "nickname": "Tran Hoai An",
                "description": null,
                "createdAt": "2022-07-16T14:53:00.661Z",
                "updatedAt": "2022-07-17T05:09:38.863Z"
            }
        }
    }
]
```
</details>


<details>
<summary><span style="font-weight:bold"> View video</summary>

Request:
```http
Route: /video/:videoId/view
Method: GET
Params: 
    videoId: uuid
```
Respone:
```video/mp4
Video
```
</details>

#### Follow api

<details>
<summary><span style="font-weight:bold"> Add follow another people </summary>

Request:
```http
Route: /follow
Method: POST
Headers: 
    Authorization: Bearer <access_token>
Data: 
    userId: uuid
```
Respone:
```json
{
    "followId": "3965eadc-a96b-4387-bbe9-d4ed9cafea88",
    "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
    "follower": "28ddb078-2c81-46b2-a7cc-f51ea85c51df",
    "updatedAt": "2022-07-17T08:04:56.740Z",
    "createdAt": "2022-07-17T08:04:56.740Z"
}
```
</details>

<details>
<summary><span style="font-weight:bold"> Get follow with another people </summary>

Request:
```http
Route: /follow/user/:userId
Method: GET
Headers: 
    Authorization: Bearer <access_token>
Params: userId
```
Respone:
```json
{
    "followId": "3965eadc-a96b-4387-bbe9-d4ed9cafea88",
    "createdAt": "2022-07-17T08:04:56.740Z",
    "updatedAt": "2022-07-17T08:04:56.740Z",
    "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
    "follower": "28ddb078-2c81-46b2-a7cc-f51ea85c51df"
}
```
</details>

<details>
<summary><span style="font-weight:bold"> Get user's follower </summary>

Request:
```http
Route: /followers
Method: GET
Headers:
    Authorization: Bearer <access_token>
```
Respone:
```json
[
    {
        "followId": "3965eadc-a96b-4387-bbe9-d4ed9cafea88",
        "createdAt": "2022-07-17T08:04:56.740Z",
        "updatedAt": "2022-07-17T08:04:56.740Z",
        "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
        "follower": "28ddb078-2c81-46b2-a7cc-f51ea85c51df",
        "user": {
            "username": "hoaian412004",
            "nickname": "Tran Hoai An Dep trai",
            "image": null
        }
    }
]
```
</details>

<details>
<summary><span style="font-weight:bold"> Get user's following </summary>

Request:
```http
Route: /following
Method: GET
Headers:
    Authorization: Bearer <access_token>
```
Respone:
```json
[
    {
        "followId": "3965eadc-a96b-4387-bbe9-d4ed9cafea88",
        "createdAt": "2022-07-17T08:04:56.740Z",
        "updatedAt": "2022-07-17T08:04:56.740Z",
        "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
        "follower": "28ddb078-2c81-46b2-a7cc-f51ea85c51df",
        "user": {
            "username": "hoaian412004",
            "nickname": "Tran Hoai An Dep trai",
            "image": null
        }
    }
]
```
</details>


<details>
<summary><span style="font-weight:bold"> Delete user's following </summary>

Request:
```http
Route: /follow/user/:userId
Method: DELETE
Headers:
    Authorization: Bearer <access_token>
```
Respone:
```json
deleted
```
</details>

#### Image api
<details>
<summary><span style="font-weight:bold">Add user's image</summary>

Request: 
```http
Route: /image
Method: POST
Headers:
    Authorization: Bearer <access_token>
```
Respone:
```json
{
    "imageId": "aeaebd77-f7e6-40a6-8ec1-e639252b209b",
    "url": "http://localhost:4000/image/aeaebd77-f7e6-40a6-8ec1-e639252b209b/view",
    "createdAt": "2022-07-17T05:43:45.352Z",
    "updatedAt": "2022-07-17T05:43:45.352Z",
    "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40"
}
```
</details>

<details>
<summary><span style="font-weight:bold">Get image by userId</summary>

Request: 
```http
Route: /image/user/:userId
Method: GET
Params: 
    userId: uuid
```
Respone:
```json
{
    "imageId": "aeaebd77-f7e6-40a6-8ec1-e639252b209b",
    "url": "http://localhost:4000/image/aeaebd77-f7e6-40a6-8ec1-e639252b209b/view",
    "createdAt": "2022-07-17T05:43:45.352Z",
    "updatedAt": "2022-07-17T05:43:45.352Z",
    "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40"
}
```
</details>

<details>
<summary><span style="font-weight:bold">View Image</summary>

Request: 
```http
Route: /image/:imageId/view
Method: GET
Params:
    imageId: uuid
```
Respone:
```json
Image
```
</details>

<details>
<summary><span style="font-weight:bold">Delete image</summary>

Request: 
```http
Route: /image/:imageId
Method: DELETE
Headers:
    Authorization: Bearer <access_token>
Params: 
    imageId: uuid
```
Respone:
```json
deleted
```
</details>

#### Like api
<details>
<summary><span style="font-weight:bold">Like video</summary>

Request:
```http
Route: /like/video/:videoId
Method: POST
Headers:
    Authorization: Bearer <access_token>
Params:
    videoId: uuid
```
Respone:
```json
{
    "likeId": "184e5c13-aed7-47a9-b307-946e8423bcf9",
    "videoId": "8bbfed25-3a5f-4041-8500-a40600a2875c",
    "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
    "updatedAt": "2022-07-17T08:31:12.952Z",
    "createdAt": "2022-07-17T08:31:12.952Z"
}
```
</details>

<details>
<summary><span style="font-weight:bold">Get like video</summary>

Request:
```http
Route: /like/video/:videoId
Method: GET
Headers:
    Authorization: Bearer <access_token>
Params: 
    videoId: uuid
```
Respone:
```json
{
    "likeId": "184e5c13-aed7-47a9-b307-946e8423bcf9",
    "createdAt": "2022-07-17T08:31:12.952Z",
    "updatedAt": "2022-07-17T08:31:12.952Z",
    "videoId": "8bbfed25-3a5f-4041-8500-a40600a2875c",
    "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40"
}
```
</details>

<details>
<summary><span style="font-weight:bold">Get all like's infomation of video was created_by user authorized</summary>

Request:
```http
Route: /likes/video/:videoId
Method: GET
Headers:
    Authorization: Bearer <access_token>
Params: videoId
```
Respone:
```json
[
    {
        "likeId": "6383bbd1-64da-439a-8792-50de296eae84",
        "createdAt": "2022-07-17T08:36:08.543Z",
        "updatedAt": "2022-07-17T08:36:08.543Z",
        "videoId": "5b5f6d09-b4da-4d5a-bebc-89ba178d6807",
        "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
        "user": {
            "userId": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
            "username": "Testing_username",
            "nickname": "Testing_nickname",
            "password": "$2b$11$iAwj9pE7nSb5BQOusi8a1u2Dy3JOJnXN8I61ic3TuttAEuREINmkW",
            "description": "Testing_description",
            "createdAt": "2022-07-17T05:40:40.276Z",
            "updatedAt": "2022-07-17T05:40:40.276Z",
            "image": {
                "imageId": "aeaebd77-f7e6-40a6-8ec1-e639252b209b",
                "url": "http://localhost:4000/image/aeaebd77-f7e6-40a6-8ec1-e639252b209b/view",
                "createdAt": "2022-07-17T05:43:45.352Z",
                "updatedAt": "2022-07-17T05:43:45.352Z",
                "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40"
            }
        }
    }
]
```
</details>

<details>
<summary><span style="font-weight:bold">Delete like</summary>

Request:
```http
Route: /like/video/:videoId
Method: DELETE
Headers:
    Authorization: Bearer <access_token>
Params: videoId
```
Respone:
```json
deleted
```
</details>

#### Comment api

<details>
<summary><span style="font-weight:bold">Comment Video</summary>

Request:
```http
Route: /comment/video/:videoId
Method: POST
Headers:
    Authorization: Bearer <access_token>
Params:
    videoId: uuid
```
Respone:
```json
{
    "commentId": "150f12fc-f4d3-48ea-b6fa-6e4a767038cb",
    "created_at": "2022-07-17T08:38:20.086Z",
    "parent": null,
    "text": "this is test comment",
    "videoId": "5b5f6d09-b4da-4d5a-bebc-89ba178d6807",
    "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
    "updatedAt": "2022-07-17T08:44:19.906Z",
    "createdAt": "2022-07-17T08:44:19.906Z"
}
```
</details>


<details>
<summary><span style="font-weight:bold">Get comment video</summary>

Request:
```http
Route: /comment/:commendId
Method: GET
Params:
    commentId: uuid
```
Respone:
```json
{
    "commentId": "150f12fc-f4d3-48ea-b6fa-6e4a767038cb",
    "text": "this is test comment",
    "created_at": "2022-07-17T08:38:20.086Z",
    "createdAt": "2022-07-17T08:44:19.906Z",
    "updatedAt": "2022-07-17T08:44:19.906Z",
    "videoId": "5b5f6d09-b4da-4d5a-bebc-89ba178d6807",
    "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
    "parent": null,
    "user": {
        "userId": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
        "username": "Testing_username",
        "nickname": "Testing_nickname",
        "description": "Testing_description",
        "createdAt": "2022-07-17T05:40:40.276Z",
        "updatedAt": "2022-07-17T05:40:40.276Z",
        "image": {
            "imageId": "aeaebd77-f7e6-40a6-8ec1-e639252b209b",
            "url": "http://localhost:4000/image/aeaebd77-f7e6-40a6-8ec1-e639252b209b/view",
            "createdAt": "2022-07-17T05:43:45.352Z",
            "updatedAt": "2022-07-17T05:43:45.352Z",
            "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40"
        }
    }
}
```
</details>

<details>
<summary><span style="font-weight:bold">Get comments Video</summary>

Request:
```http
Route: /comments/video/:videoId
Method: GET
Params:
    videoId: uuid
Query:
    parent: uuid
```
Respone:
```json
[
    {
        "commentId": "150f12fc-f4d3-48ea-b6fa-6e4a767038cb",
        "text": "this is test comment",
        "created_at": "2022-07-17T08:38:20.086Z",
        "createdAt": "2022-07-17T08:44:19.906Z",
        "updatedAt": "2022-07-17T08:44:19.906Z",
        "videoId": "5b5f6d09-b4da-4d5a-bebc-89ba178d6807",
        "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
        "parent": null,
        "user": {
            "userId": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40",
            "username": "Testing_username",
            "nickname": "Testing_nickname",
            "description": "Testing_description",
            "createdAt": "2022-07-17T05:40:40.276Z",
            "updatedAt": "2022-07-17T05:40:40.276Z",
            "image": {
                "imageId": "aeaebd77-f7e6-40a6-8ec1-e639252b209b",
                "url": "http://localhost:4000/image/aeaebd77-f7e6-40a6-8ec1-e639252b209b/view",
                "createdAt": "2022-07-17T05:43:45.352Z",
                "updatedAt": "2022-07-17T05:43:45.352Z",
                "owner": "a090c1c1-a8bf-4ce2-abe1-033f3e6fef40"
            }
        }
    }
]
```
</details>


## Authentication flow
##### 1. Register account at api /register
##### 2. Login account at api /login and then you will get access_tokn and refresh_token
##### 3. access_token can use to authorize to call api and refresh_token and get access_token if it is expired loss.
##### 4. Use [Bearer Authorization](https://swagger.io/docs/specification/authentication/bearer-authentication/) to access some api need authorization (see below)

## Note

You can use [ myfaveTT ](https://chrome.google.com/webstore/detail/myfavett-download-all-you/gmajiifkcmjkehmngbopoobeplhoegad) (extension in chrome) to download video in tiktok
