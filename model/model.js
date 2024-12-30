export class userModel {
  constructor(user) {
    this.username = user.username;
    this.password = user.password;
  }
}

export class contactModel {
  constructor(contact) {
    (this.name = contact.name),
      (this.email = contact.email),
      (this.contact = contact.contact),
      (this.message = contact.message);
  }
}

export class blogModel {
  constructor(blog) {
    (this.category = blog.category),
      (this.title = blog.title),
      (this.description = blog.description),
      (this.date = blog.date);
      this.image = blog.image
  }
}
