from pydantic import BaseModel, ConfigDict        

class LoginRequest(BaseModel):                                                                                         
      email: str
      password: str                                                                                                      
                                                                                                                       
class RegisterRequest(BaseModel):                                                                                    
      email: str
      password: str
      full_name: str

class UserResponse(BaseModel):                                                                                         
    id: int
    email: str                                                                                                         
    full_name: str                                                                                     

    model_config = ConfigDict(from_attributes=True)

class AuthResponse(BaseModel):
      access_token: str                                                                                                  
      token_type: str = "bearer"
      refresh_token: str | None = None
      user: UserResponse