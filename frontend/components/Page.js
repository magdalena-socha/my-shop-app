import Header from "./Header";


export default function Page({ children, cool}) {
    return (
      <div>
        <Header/>
        <p>Hello {cool} </p>
        {children}
      </div>
    );
  }