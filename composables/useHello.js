export const useHello = () => { // named export
    return useState('hello', () => 'Hello world composable test aus named Export') // useState ist NICHT reaktiv
   }