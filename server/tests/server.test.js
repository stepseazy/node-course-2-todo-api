const request=require('supertest');
const expect=require('expect');
const {ObjectID}=require('mongodb');
const _=require('lodash');

const {app}=require('./../server');
const {Todo}=require('./../models/todo');
const {User}=require('./../models/user');
const{todos, populateTodos,users,populateUsers}=require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('Post /todos',()=>{
  it('should create a new todo',(done)=>{
    var text='test todo text';
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
      if (err){
        return done(err);
      }
      Todo.find({text}).then((todos)=>{
        console.log({text});
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e)=>done(e));
    });
  });
  it('should not create todo with invalid body data',(done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end(
      (err,res)=>{
        if (err){
          return done(err);
        }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        })
        .catch((e)=>{
          done(e)
        });
      }
    );
  });
});

describe('GET /todos',()=>{
  it('should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);

  });
});
describe('GET /todos/id',()=>{
  it('shoud return todo doc',(done)=>{
    request(app).get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.r.text).toBe(todos[0].text);
    })
    .end(done);
  });
  it('should return 404 if todo not found',(done)=>{
    request(app).get(`/todos/5a4fc0a0b7d73f0f20f349fe`)
    .expect(404)
    .end(done)
  });
  it('should return 404 for non valid id',(done)=>{
    request(app).get(`/todos/123`)
    .expect(400)
    .end(done)
  });

});
describe('DELETE/ todos/:id',()=>{
  it('should remove a todo',(done)=>{
    var hexId=todos[1]._id.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.r._id).toBe(hexId);
    })
    .end((e,r)=>{
      if(e){
        return done(e);
      }
      //query database using findByIdAndRemove
      /// expect(null).toNotexist();
      Todo.findById(hexId).then(
        (res)=>{
          expect(res).toBe(null);
          done();
        }
      ).catch((e)=>done(e));

    });
  });
  it('should return a 404 if todo not found',(done)=>{
    var hexId=new ObjectID().toHexString();
    request(app).delete(`/todos/${hexId}`)
    .expect(404)
    .end(done)
  });
  it('should return a 404 if id not valid',(done)=>{
    request(app).delete(`/todos/123`)
    .expect(404)
    .end(done)
  });
});

describe('PATCH /todos/:id',()=>{
  it('should update the todo', (done)=>{
    var hexId=todos[1]._id.toHexString();
    request(app).patch(`/todos/${hexId}`)
    .send({
      text:'test update',
      completed:true
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe('test update');
      expect(typeof res.body.todo.completedAt).toBe('number');
      expect(res.body.todo.completed).toBe(true);
    })
    .end(done);
    });
  it('should clear completedAt when todo is not completed', (done)=>{
    var hexId=todos[1]._id.toHexString();
    request(app).patch(`/todos/${hexId}`)
    .send({
      text:'test update',
      completed:false
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe('test update');
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toBe(null);
    })
    .end(done);
    });

});
describe('GET users/me',()=>{
  it('should return user if authenticated',(done)=>{
    request(app)
    .get('/users/me')
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .expect((res)=>{
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
  it('should return 401 if not authenticated', (done)=>{
    request(app)
    .get('/users/me')
    .expect(401)
    .expect((res)=>{
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', ()=>{
  it('should create a user', (done)=>{
    var email='example@example.com';
    var password='123mnb!';
    request(app)
    .post('/users')
    .send({email,password})
    .expect(200)
    .expect((res)=>{
      expect(res.headers['x-auth']).toBeTruthy();
      expect(res.body._id).toBeTruthy();
      expect(res.body.email).toBe(email);
    })
    .end((err)=>{
      if(err){
        return done(err);
      }
      User.findOne({email}).then((user)=>{
        expect(user).toBeTruthy();
        expect(user.password).not.toBe(password);
        done();

      }).catch((e)=>done(e));
    });
  });
  it('should return validation errors if request invalid', (done)=>{
    var email='example.com';
    var password='123';
    request(app)
    .post('/users')
    .send({email,password})
    .expect(400)
    .end(done);
  });
  it('should not create user if email in use', (done)=>{
    var email=users[0].email;
    var password='123mnb!';
    request(app)
    .post('/users')
    .send({email,password})
    .expect(400)
    .end(done);
  });

});

describe('POST  /users/login',()=>{
  it('should login user and return auth token',(done)=>{
    request (app)
    .post('/users/login')
    .send({
      email:users[1].email,
      password:users[1].password
    })
    .expect(200)
    .expect((res)=>{
      expect(res.headers['x-auth']).toBeTruthy();
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      User.findById(users[1]._id).then((user)=>{
        expect(user.tokens[0].access).toMatch('auth');
        expect(user.tokens[0].token).toMatch(res.headers['x-auth']);

        done();
      }).catch((e)=>done(e));
    });
});
  it('should reject invalid login',(done)=>{
    request (app)
    .post('/users/login')
    .send({
      email:users[1].email,
      password:users[0].password
    })
    .expect(400)
    .expect((res)=>{
      expect(res.headers['x-auth']).toBeUndefined();
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      User.findById(users[1]._id).then((user)=>{
        expect(user.tokens.length).toBe(0);

        done();
      }).catch((e)=>done(e));
    });
  });

});
