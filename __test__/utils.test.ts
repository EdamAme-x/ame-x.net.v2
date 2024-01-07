import { genTime } from "../utils/time/genTime";

describe('Utils', () => {
  it('time', () => {
    const time = genTime();
    const [hours, minutes, seconds] = time.split(':');
    const date = new Date();

    expect(hours).toBe(date.getHours().toString());
    expect(minutes).toBe(date.getMinutes().toString());
    expect(seconds).toBe(date.getSeconds().toString());
  })
})