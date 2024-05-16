
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from './users.service';
import { User } from '../models/user.model';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    const dummyUsers: User[] = [
      {
        id: 1, name: 'John Doe',
        email: '',
        password: '',
        active: false,
        roleId: 0
      },
      {
        id: 2, 
        name: 'Jane Smith',
        email: '',
        password: '',
        active: false,
        roleId: 0
      }
    ];

    service.getAllUsers().then((users: User[]) => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should get user by id', () => {
    const dummyUser: User = {
      id: 1, 
      name: 'John Doe',
      email: '',
      password: '',
      active: false,
      roleId: 0
    };
    const userId = 1;

    service.getUserById(userId).then((user: User) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should create a user', () => {
    const dummyUser: User = {
      id: 1, 
      name: 'John Doe',
      email: '',
      password: '',
      active: false,
      roleId: 0
    };

    service.createUser(dummyUser).then((user: User) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyUser);
    req.flush(dummyUser);
  });

  it('should update a user', () => {
    const dummyUser: User = {
      id: 1, 
      name: 'John Doe',
      email: '',
      password: '',
      active: false,
      roleId: 0
    };

    service.updateUser(dummyUser).then((user: User) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/users/${dummyUser.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dummyUser);
    req.flush(dummyUser);
  });

  it('should delete a user', () => {
    const userId = 1;

    service.deleteUser(userId).then(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});