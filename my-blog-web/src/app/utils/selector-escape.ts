export class SelectorEscape {
  /**
   * ` !"#$%&'()*+,./:;<=>?@[\]^`{|}~`
   * @param str 转义的字符串
   */
  static selectEncode(str: string) {
    // 第一次要转换/,这个是个坑
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/ /g, '\\ ');
    str = str.replace(/!/g, '\\!');
    str = str.replace(/"/g, '\\"');
    str = str.replace(/#/g, '\\#');
    str = str.replace(/\$/g, '\\$');
    str = str.replace(/%/g, '\\%');
    str = str.replace(/'/g, '\\\'');
    str = str.replace(/\(/g, '\\(');
    str = str.replace(/\)/g, '\\)');
    str = str.replace(/\*/g, '\\*');
    str = str.replace(/\+/g, '\\+');
    str = str.replace(/,/g, '\\,');
    str = str.replace(/\./g, '\\.');
    str = str.replace(/\//g, '\\/');
    str = str.replace(/:/g, '\\:');
    str = str.replace(/;/g, '\\;');
    str = str.replace(/</g, '\\<');
    str = str.replace(/=/g, '\\=');
    str = str.replace(/>/g, '\\>');
    str = str.replace(/\?/g, '\\?');
    str = str.replace(/@/g, '\\@');
    str = str.replace(/\[/g, '\\[');
    str = str.replace(/]/g, '\\]');
    str = str.replace(/\^/g, '\\^');
    str = str.replace(/`/g, '\\`');
    str = str.replace(/{/g, '\\{');
    str = str.replace(/\|/g, '\\|');
    str = str.replace(/}/g, '\\}');
    str = str.replace(/~/g, '\\~');
    return str

  }

}
