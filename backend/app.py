from typing import Optional
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import FastAPI, status, HTTPException, Depends
from fastapi.responses import RedirectResponse
from Auth.schemas import UserAuth, TokenSchema
from Auth.utils import (
    get_hashed_password,
    create_access_token,
    create_refresh_token,
    verify_password
)
from Auth.deps import get_current_user
from Services.UserService import UserService
from Services.FacebookService import FacebookService

from Models.User import User, SystemUser
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/', response_class=RedirectResponse, include_in_schema=False)
async def docs():
    return RedirectResponse(url='/docs')


@app.post('/signup', summary="Create new user", response_model=User)
async def create_user(data: UserAuth):
    userService = UserService()
    user = userService.get_user_for_name(data.name)
    if user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this name already exist"
        )

    is_admin = False
    password = get_hashed_password(data.password)
    user = userService.add_user(is_admin,data.name,password, None)
    return user


@app.post('/login', summary="Create access and refresh tokens for user", response_model=TokenSchema)
async def login(username: str, fb_token: Optional[str] = None, password: Optional[str] = None):
    if not (fb_token is None):
        user = FacebookService().get_user_for_token(username, fb_token)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect name or fb_token"
            )

    if fb_token is None:
        user = UserService().get_user_for_name(username)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect name or password"
            )

        hashed_pass = user.password
        if not verify_password(password, hashed_pass):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect name or password"
            )

    return TokenSchema(access_token=create_access_token(user.name), refresh_token=create_refresh_token(user.name))


@app.get('/me', summary='Get details of currently logged in user', response_model=User)
async def get_me(user: SystemUser = Depends(get_current_user)):
   return user


@app.get('/users', summary='Get users')
async def get_users(user: SystemUser = Depends(get_current_user)):
    userService = UserService()
    users = userService.get_users()
    return users


@app.get('/user', summary='Get user')
async def get_users(user_id: int, user: SystemUser = Depends(get_current_user)):
    return UserService().get_user_for_id(user_id)



@app.delete('/user', summary="Delete user")
async def delete_user(user_id: int, user: SystemUser = Depends(get_current_user)):
    if user.is_admin == False:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You are not admin"
        )

    if user.id == user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You can not delete yourself"
        )

    return UserService().delete_user(user_id)

@app.post('/user/admin', summary="change admin")
async def change_admin(user_id: int, is_admin: bool, user: SystemUser = Depends(get_current_user)):
    if user.is_admin == False:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You are not admin"
        )

    return UserService().change_admin(user_id,is_admin)