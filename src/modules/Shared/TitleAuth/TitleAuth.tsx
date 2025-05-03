import { Link } from "react-router-dom";

function TitleAuth({ title, desc, link, navigateTo }: { title: string; desc: string; link: string; navigateTo: string }) {
  return (
    <div>
      <h2 className="fs-2 fw-bold">{title}</h2>
      <p>{desc}</p>
      <Link to={navigateTo}>{link}</Link>
    </div>
  )
}

export default TitleAuth
