from app.utils.exceptions import ConflictException, UnauthorizedException


class InvalidCredentialsException(UnauthorizedException):
    def __init__(self) -> None:
        super().__init__(message="Invalid email or password")


class EmailAlreadyExistsException(ConflictException):
    def __init__(self) -> None:
        super().__init__(message="User with this email already exists")
