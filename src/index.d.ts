declare module 'react-awesome-loaders' {
 export class BoxesLoader extends React.Component<BoxesLoaderProps & any, any> {

 }
 
 export interface BoxesLoaderProps {
    className : string;
    boxColor : string;
    shadowColor : string;
    duration : number;
    size : string;
    desktopSize : string;
    mobileSize : string
 }
}
