import styles from './style.module.scss';
interface Child {
  id: string,
  title: string,
  link: string
}

const Footer = ({ schema }: any) => {
  const { attributes = {}, children = [] } = schema
  const { copyright, record } = attributes
  return (
    <div className='wrapper'>
      <div className={styles.footer}>
        <ul className={styles.back}>
          <li className={styles.item}>
            <a className={styles.link} href="/admin.html">进入管理页面</a>
          </li>
          {
            children.map((child: Child, index: number) => {
              return (
                <li key={index} className={styles.item}>
                  <a className={styles.link} href={child.link}>{child.title}</a>
                </li>
              )
            })
          }
        </ul>
        <div className={styles.list}>
          <span className={styles.copyright}>{copyright}</span>
          <span className={styles.record}>{record}</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;