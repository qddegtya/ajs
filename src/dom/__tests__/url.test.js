import { UrlParser } from '../url';

describe('UrlParser', () => {
  describe('URL Parsing', () => {
    test('should parse full URL correctly', () => {
      const url = 'https://user:pass@example.com:8080/path/to/page?key1=value1&key2=value2#section1';
      const parser = new UrlParser(url);

      expect(parser.protocol).toBe('https');
      expect(parser.username).toBe('user');
      expect(parser.password).toBe('pass');
      expect(parser.hostname).toBe('example.com');
      expect(parser.port).toBe('8080');
      expect(parser.path).toBe('/path/to/page');
      expect(parser.query).toBe('key1=value1&key2=value2');
      expect(parser.hash).toBe('section1');
    });

    test('should handle minimal URL', () => {
      const url = 'http://example.com';
      const parser = new UrlParser(url);

      expect(parser.protocol).toBe('http');
      expect(parser.hostname).toBe('example.com');
      expect(parser.path).toBe('');
      expect(parser.query).toBe('');
      expect(parser.hash).toBe('');
    });

    test('should handle empty URL', () => {
      const parser = new UrlParser('');
      expect(parser.toString()).toBe('');
    });

    test('should throw error for invalid URL', () => {
      expect(() => new UrlParser(':::invalid:::')).toThrow('Invalid URL format');
    });
  });

  describe('Query Parameters', () => {
    test('should parse query parameters correctly', () => {
      const url = 'http://example.com?name=John&age=25&colors=red&colors=blue';
      const parser = new UrlParser(url);

      expect(parser.getQueryParam('name')).toBe('John');
      expect(parser.getQueryParam('age')).toBe('25');
      expect(parser.getQueryParam('colors')).toEqual(['red', 'blue']);
    });

    test('should handle URL encoded parameters', () => {
      const url = 'http://example.com?name=' + encodeURIComponent('John Doe') + '&data=' + encodeURIComponent('a=1&b=2');
      const parser = new UrlParser(url);

      expect(parser.getQueryParam('name')).toBe('John Doe');
      expect(parser.getQueryParam('data')).toBe('a=1&b=2');
    });

    test('should set and remove query parameters', () => {
      const parser = new UrlParser('http://example.com');

      parser.setQueryParam('name', 'John');
      expect(parser.getQueryParam('name')).toBe('John');

      parser.setQueryParam('colors', ['red', 'blue']);
      expect(parser.getQueryParam('colors')).toEqual(['red', 'blue']);

      parser.removeQueryParam('name');
      expect(parser.getQueryParam('name')).toBeUndefined();
    });

    test('should handle empty and null query values', () => {
      const url = 'http://example.com?empty=&null=null&undefined';
      const parser = new UrlParser(url);

      expect(parser.getQueryParam('empty')).toBe('');
      expect(parser.getQueryParam('null')).toBe('null');
      expect(parser.getQueryParam('undefined')).toBe('');
    });
  });

  describe('URL Manipulation', () => {
    test('should generate correct URL string', () => {
      const parser = new UrlParser('http://example.com');
      parser.setQueryParam('name', 'John');
      parser.setQueryParam('age', '25');

      expect(parser.toString()).toBe('http://example.com?name=John&age=25');
    });

    test('should handle array query parameters in toString', () => {
      const parser = new UrlParser('http://example.com');
      parser.setQueryParam('colors', ['red', 'blue']);

      expect(parser.toString()).toBe('http://example.com?colors=red&colors=blue');
    });

    test('should clone URL parser', () => {
      const original = new UrlParser('http://example.com?name=John');
      const clone = original.clone();

      clone.setQueryParam('age', '25');

      expect(original.toString()).toBe('http://example.com?name=John');
      expect(clone.toString()).toBe('http://example.com?name=John&age=25');
    });
  });

  describe('Path Resolution', () => {
    test('should resolve absolute paths', () => {
      const parser = new UrlParser('http://example.com/base/path');
      const resolved = parser.resolve('/new/path');

      expect(resolved.toString()).toBe('http://example.com/new/path');
    });

    test('should resolve relative paths', () => {
      const parser = new UrlParser('http://example.com/base/path/');
      const resolved = parser.resolve('new/path');

      expect(resolved.toString()).toBe('http://example.com/base/path/new/path');
    });

    test('should handle parent directory references', () => {
      const parser = new UrlParser('http://example.com/base/path/');
      const resolved = parser.resolve('../new/path');

      expect(resolved.toString()).toBe('http://example.com/base/new/path');
    });

    test('should handle full URLs in resolve', () => {
      const parser = new UrlParser('http://example.com/base/path');
      const resolved = parser.resolve('https://other.com/path');

      expect(resolved.toString()).toBe('https://other.com/path');
    });
  });
});
