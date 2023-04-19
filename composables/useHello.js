export const useHello = () => { // named export
    return useState('hello', () => 'Hello world') // useState ist NICHT reaktiv
   }