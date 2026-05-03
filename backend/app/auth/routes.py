from app.auth.api.auth import auth_router
from app.database.session_handler import DBAPIRouter


router = DBAPIRouter(prefix="/user", tags=["User"])

router.include_router(auth_router)
