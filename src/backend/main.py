from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= MONGODB =================

client = MongoClient("mongodb+srv://jesslin2324_db_user:DXdBT359JXTNGEyK@cluster0.fm4ty3d.mongodb.net/blog_app?retryWrites=true&w=majority")

db = client["blog_app"]

users_col = db["users"]
blogs_col = db["blogs"]
comments_col = db["comments"]
watchlist_col = db["watchlists"]
editorials_col = db["editorials"]

# ================= AUTH =================

@app.post("/register")
def register(user: dict):

    if not user.get("email") or not user.get("username") or not user.get("password"):
        return {"error": "Missing fields"}

    if users_col.find_one({"email": user["email"]}):
        return {"error": "Email already exists"}

    if users_col.find_one({"username": user["username"]}):
        return {"error": "Username already taken"}

    users_col.insert_one(user)

    return {"message": "Registered successfully"}


@app.post("/login")
def login(user: dict):

    found = users_col.find_one({
        "email": user["email"],
        "password": user["password"]
    })

    if found:
        return {
            "message": "Login successful",
            "user": {
                "email": found["email"],
                "username": found["username"]
            }
        }

    return {"error": "Invalid credentials"}


# ================= BLOGS =================

@app.get("/blogs")
def get_blogs():
    blogs = list(blogs_col.find({}, {"_id": 0}))
    return blogs


@app.post("/blogs")
def add_blog(blog: dict):

    blogs_col.insert_one(blog)

    return {"message": "Blog added"}


# ================= WATCHLIST =================

@app.get("/watchlist/{username}")
def get_watchlist(username: str):

    data = watchlist_col.find_one({"username": username})

    if data:
        return data.get("blogs", [])

    return []


@app.post("/watchlist/{username}")
def add_watchlist(username: str, blog: dict):

    existing = watchlist_col.find_one({"username": username})

    if existing:

        for b in existing["blogs"]:
            if b["title"] == blog["title"]:
                return {"message": "Already added"}

        watchlist_col.update_one(
            {"username": username},
            {"$push": {"blogs": blog}}
        )

    else:

        watchlist_col.insert_one({
            "username": username,
            "blogs": [blog]
        })

    return {"message": "Added"}


@app.post("/watchlist/{username}/remove")
def remove_watchlist(username: str, blog: dict):

    watchlist_col.update_one(
        {"username": username},
        {"$pull": {"blogs": {"title": blog["title"]}}}
    )

    return {"message": "Removed"}


# ================= EDITORIALS =================

@app.get("/editorials")
def get_editorials():

    data = list(editorials_col.find({}, {"_id": 0}))

    # if empty, insert default data
    if not data:

        default = [
            {
                "id": 1,
                "title": "Korean Film Wins Global Award",
                "date": "March 22, 2026",
                "shortDescription": "Korean cinema gains global recognition.",
                "fullDescription": "A Korean film wins international awards for storytelling and visuals.",
                "likes": 0,
                "liked_by": []
            },
            {
                "id": 2,
                "title": "K-pop Global Expansion",
                "date": "March 22, 2026",
                "shortDescription": "K-pop continues to dominate globally.",
                "fullDescription": "K-pop groups expand worldwide tours and break streaming records.",
                "likes": 0,
                "liked_by": []
            }
        ]

        editorials_col.insert_many(default)
        return default

    return data


# ================= LIKE =================

@app.post("/editorials/{id}/like")
def toggle_like(id: int, data: dict):

    username = data.get("username")

    editorial = editorials_col.find_one({"id": id})

    if not editorial:
        return {"error": "Not found"}

    if username in editorial["liked_by"]:

        editorials_col.update_one(
            {"id": id},
            {"$pull": {"liked_by": username}, "$inc": {"likes": -1}}
        )

        return {"message": "Unliked"}

    else:

        editorials_col.update_one(
            {"id": id},
            {"$push": {"liked_by": username}, "$inc": {"likes": 1}}
        )

        return {"message": "Liked"}


# ================= COMMENTS =================

@app.get("/editorials/{id}/comments")
def get_comments(id: int):

    comments = list(comments_col.find({"editorial_id": id}, {"_id": 0}))

    return comments


@app.post("/editorials/{id}/comments")
def add_comment(id: int, data: dict):

    comments_col.insert_one({
        "editorial_id": id,
        "username": data["username"],
        "text": data["text"]
    })

    return {"message": "Comment added"}


@app.delete("/comments")
def delete_comment(data: dict):

    username = data.get("username")
    text = data.get("text")

    comment = comments_col.find_one({
        "username": username,
        "text": text
    })

    if not comment:
        return {"error": "Not found"}

    comments_col.delete_one({
        "username": username,
        "text": text
    })

    return {"message": "Deleted"}