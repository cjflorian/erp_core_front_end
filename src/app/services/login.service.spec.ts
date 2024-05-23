import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to the login endpoint', () => {
    const user = { username: 'testuser', password: 'testpassword' };
    const expectedResponse = { success: true };
    const expectedR = Array.of(expectedResponse);

    service.login(user).then(response => {
      expect(response).toEqual(expectedR);
    });

    const req = httpMock.expectOne(service.baseUrl + 'login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);

    req.flush(expectedResponse);
  });
});