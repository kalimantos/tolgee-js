import { FormatSimple } from '../FormatSimple/FormatSimple';
import { Tolgee } from '../Tolgee';

describe('format simple', () => {
  it('works with parameters', () => {
    const tolgee = Tolgee()
      .use(FormatSimple())
      .init({
        language: 'en',
        staticData: { en: { apples: 'Bob has { num } apples' } },
      });
    expect(tolgee.t('apples', { num: 7 })).toEqual('Bob has 7 apples');
  });

  it('throws an error when parameter missing', () => {
    const tolgee = Tolgee()
      .use(FormatSimple())
      .init({
        language: 'en',
        staticData: { en: { apples: 'Bob has { num } apples' } },
      });
    expect(() => tolgee.t('apples')).toThrow(
      'Missing parameter "num" in "Bob has { num } apples"'
    );
  });
});
