import { parseJsonByString } from '../../../common/utils'
import * as C from '../../../common/constant'
import { Schema } from '../../../common/type'
import Banner from './component/Banner'
import List from './component/List'
import Footer from './component/Footer'
import Nothing from './component/Nothing'
const { children = [] } = parseJsonByString(window.localStorage[C.SCHEMA], {})
const map = { Banner, List, Footer } as any
const render = (item: Schema, index: number) => {
    const Component = map[item.name]
    return Component ? <Component key={index} schema={item} /> : null
}

const App = () => {
    return (
        <div >
            {
                children.map((child: Schema, index: number) => render(child, index))
            }
            <Nothing />
        </div>
    );
}

export default App;
