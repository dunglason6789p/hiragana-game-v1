export class HiraRow {
  hira: string;
  pronounce: string;
  constructor(hira: string, pronounce: string){
    this.hira = hira;
    this.pronounce = pronounce;
  }
}
export const HIRADB: HiraRow[] = [
  new HiraRow('あ', 'a'),
  new HiraRow('え', 'e'),
  new HiraRow('い', 'i'),
  new HiraRow('お', 'o'),
  new HiraRow('う', 'u'),

  new HiraRow('か', 'ka'),
  new HiraRow('け', 'ke'),
  new HiraRow('き', 'ki'),
  new HiraRow('こ', 'ko'),
  new HiraRow('く', 'ku'),

  new HiraRow('は', 'ha'),
  new HiraRow('へ', 'he'),
  new HiraRow('ひ', 'hi'),
  new HiraRow('ほ', 'ho'),
  new HiraRow('ふ', 'fu'),

  new HiraRow('た', 'ta'),
  new HiraRow('て', 'te'),
  new HiraRow('ち', 'chi'),
  new HiraRow('と', 'to'),
  new HiraRow('つ', 'tsu'),

  new HiraRow('さ', 'sa'),
  new HiraRow('せ', 'se'),
  new HiraRow('し', 'shi'),
  new HiraRow('そ', 'so'),
  new HiraRow('す', 'su'),

  new HiraRow('ま', 'ma'),
  new HiraRow('め', 'me'),
  new HiraRow('み', 'mi'),
  new HiraRow('も', 'mo'),
  new HiraRow('む', 'mu'),

  new HiraRow('な', 'na'),
  new HiraRow('ね', 'ne'),
  new HiraRow('に', 'ni'),
  new HiraRow('の', 'no'),
  new HiraRow('ぬ', 'nu'),

  new HiraRow('ら', 'ra'),
  new HiraRow('れ', 're'),
  new HiraRow('り', 'ri'),
  new HiraRow('ろ', 'ro'),
  new HiraRow('る', 'ru'),

  new HiraRow('ば', 'ba'),
  new HiraRow('べ', 'be'),
  new HiraRow('び', 'bi'),
  new HiraRow('ぼ', 'bo'),
  new HiraRow('ぶ', 'bu'),

  new HiraRow('ぱ', 'pa'),
  new HiraRow('ぺ', 'pe'),
  new HiraRow('ぴ', 'pi'),
  new HiraRow('ぽ', 'po'),
  new HiraRow('ぷ', 'pu'),

  new HiraRow('が', 'ga'),
  new HiraRow('げ', 'ge'),
  new HiraRow('ぎ', 'gi'),
  new HiraRow('ご', 'go'),
  new HiraRow('ぐ', 'gu'),

  new HiraRow('だ', 'da'),
  new HiraRow('で', 'de'),
  new HiraRow('ぢ', 'dji'),
  new HiraRow('ど', 'do'),
  new HiraRow('づ', 'dzu'),

  new HiraRow('ざ', 'za'),
  new HiraRow('ぜ', 'ze'),
  new HiraRow('じ', 'ji'),
  new HiraRow('ぞ', 'zo'),
  new HiraRow('ず', 'zu'),

  new HiraRow('わ', 'wa'),
  new HiraRow('を', 'o'),

  new HiraRow('や', 'ya'),
  new HiraRow('よ', 'yo'),
  new HiraRow('ゆ', 'yu'),
];
