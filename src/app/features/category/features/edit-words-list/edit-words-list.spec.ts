import { TestBed } from '@angular/core/testing';
import { EditWordsList } from './edit-words-list';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../core/services/user/user';
import { CategoryService } from '../../../home/services/categories.service';
import { WordService } from '../../../../core/services/word/word.service';

const firestoreMock = {};
const authMock = { currentUser: { uid: 'mockUid' } };
const activatedRouteMock = {
  snapshot: {
    paramMap: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get: (_key: string): string => 'mock',
    },
  },
};
const userServiceMock = {};
const categoryServiceMock = { getWords: async (): Promise<unknown[]> => [] };
const wordServiceMock = {};

describe('EditWordsList', (): void => {
  let component: EditWordsList;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        EditWordsList,
        { provide: Firestore, useValue: firestoreMock },
        { provide: Auth, useValue: authMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: WordService, useValue: wordServiceMock },
      ],
    });
    component = TestBed.inject(EditWordsList);
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
