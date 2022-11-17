import styles from './style.module.scss';

interface Child {
  id: string,
  title: string
  description: string
  cover: string
  link: string
}
const List = ({ schema }: any = {}) => {
  const { children = [] } = schema
  return (
    <div className='wrapper'>
      <ul className={styles.list}>
        {
          children.map((child: Child, index: number) => (
            <a className={styles.item} key={index} href={child.link}>
              <li>
                <img className={styles.img} src={child.cover} alt="Vue3 系统入门与项目实战" />
                <h4 className={styles.title}>{child.title}</h4>
                <p className={styles.desc}>{child.description}</p>
              </li>
            </a>
          ))
        }
      </ul>
    </div>
  );
}

export default List;