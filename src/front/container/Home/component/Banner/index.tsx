import styles from './style.module.scss';
import type { CSSProperties } from 'react'
const Banner = ({ schema }: any) => {
    const { attributes = {} } = schema
    const { title, description, showAvatar = false, avatarUrl, bgUrl = './bg.svg', bgHeigh, } = attributes
    const wrapperStyle: CSSProperties = {
        backgroundImage: `url('${bgUrl}')`,
        height: bgHeigh
    }
    return (
        <div className='wrapper'>
            <div className={styles.banner} style={wrapperStyle}>
                <div className={styles.person}>
                    {
                        (showAvatar && avatarUrl) ? <img className={styles.avatar} src={avatarUrl} alt="React" /> : null
                    }
                    <div className={styles.content}>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.description}>{description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;