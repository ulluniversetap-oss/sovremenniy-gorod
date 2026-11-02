export default function HomePage() {
  return (
    <div className="home">
      <h1>Современный город — новый стек (черновик)</h1>
      <p>
        Эта часть репозитория — новый фронтенд на Next.js с админкой Payload
        (новости по ЖК). Старый статический сайт не затронут и лежит в корне
        репозитория как есть.
      </p>
      <div className="links">
        <a className="primary" href="/events">
          Мероприятия
        </a>
        <a className="secondary" href="/admin">
          Админка
        </a>
      </div>
    </div>
  )
}
