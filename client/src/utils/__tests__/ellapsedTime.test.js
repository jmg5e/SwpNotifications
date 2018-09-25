import {
  getEllapsedMinutes,
  setRequestsEllapsedTime,
} from 'utils/ellapsedTime';

it('getEllapsedMinutes should return correct amount of elapsed time in minutes', () => {
  const createdAt = 1514764800000; // 1/1/18 0:0:0
  const now = 1514765070000; // 1/1/18 0:4:30
  Date.now = jest.genMockFunction().mockReturnValue(now);
  expect(getEllapsedMinutes(createdAt)).toEqual(4);
});

it('setRequestsEllapsedTime should return requests with correctEllapsedTime', () => {
  const now = 1514765070000; // 1/1/18 0:4:30
  Date.now = jest.genMockFunction().mockReturnValue(now);
  const requests = [
    {
      productId: 0,
      createdAt: 1514764800000, // 1/1/18 0:0:0
    },
    {
      productId: 2,
      createdAt: 1514764920000, // 1/1/18 0:2:0
    },
    {
      productId: 3,
      createdAt: 1514765070000, // 1/1/18 0:4:30
      ellapsedTime: -1,
    },
  ];
  expect(setRequestsEllapsedTime(requests)).toEqual([
    {
      productId: 0,
      createdAt: 1514764800000, // 1/1/18 0:0:0
      ellapsedTime: 4,
    },
    {
      productId: 2,
      createdAt: 1514764920000, // 1/1/18 0:2:0
      ellapsedTime: 2,
    },
    {
      productId: 3,
      createdAt: 1514765070000, // 1/1/18 0:4:30
      ellapsedTime: 0,
    },
  ]);
});
