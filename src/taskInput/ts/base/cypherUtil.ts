import * as crypto from 'crypto'
import * as _ from 'lodash'
/** 默认AES密钥 */
const AES_KEY: string = 'anYX2bSM6l/z7OSSox6zKA==\n'

/** RSA公钥 */
const PUBLIC_KEY: string = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCR4nOCkGnBwUcQPzXCYnQwQ2+IXwkTkGDc3WyU\n'
  + '8eAlV/jQTO2LGv0JECewGr2g+DetnwAfvHgv4HH3NCAgbK2yUnOpQPSaMZIUMNCWatoNTsZm0WOn\n'
  + '3XQtreQdAWgskPflxU5oJs9IUErmHoXzs2aVxozizJPazLIKKttdz5PJlwIDAQAB'

class CypherUtil {
  static newAesKey(seed: string): string {
    /**
     * todo
     */
    return _.uniqueId()
  }
}