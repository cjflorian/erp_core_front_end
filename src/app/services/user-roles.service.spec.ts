
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserRolesService } from './user-roles.service';
import { Roles } from '../models/roles.model';

describe('UserRolesService', () => {
  let service: UserRolesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRolesService]
    });
    service = TestBed.inject(UserRolesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all roles', () => {
    const mockRoles: Roles[] = [{ id: 1, roleName: 'Admin' }, { id: 2, roleName: 'User' }];

    service.getAllRoles().then((roles) => {
      expect(roles).toEqual(mockRoles);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/Rol`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRoles);
  });

  it('should get role by id', () => {
    const mockRole: Roles = { id: 1, roleName: 'Admin' };

    service.getRoleById(1).then((role) => {
      expect(role).toEqual(mockRole);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/Rol/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRole);
  });

  it('should create role', () => {
    const mockRole: Roles = { id: 1, roleName: 'Admin' };

    service.createRole(mockRole).then((createdRole) => {
      expect(createdRole).toEqual(mockRole);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/Rol`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRole);
    req.flush(mockRole);
  });

  it('should update role', () => {
    const mockRole: Roles = { id: 1, roleName: 'Admin' };

    service.updateRole(mockRole).then((updatedRole) => {
      expect(updatedRole).toEqual(mockRole);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/Rol/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockRole);
    req.flush(mockRole);
  });

  it('should delete role', () => {
    const roleId = 1;

    service.deleteRole(roleId).then((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/Rol/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});