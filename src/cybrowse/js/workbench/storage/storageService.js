export default class StorageService {
  constructor() {
    throw new Error('please use StorageService.instance() method')
  }
}

StorageService.instance = () => {
  return localStorage
}