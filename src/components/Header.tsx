
export default function Header({title,children}:{title:string,children?:JSX.Element}) {


    return(
        <div className="h-40 flex items-center justify-between">
            <h2 className="text-7 font-bold">{title}</h2>
            {children}
        </div>
    )
}