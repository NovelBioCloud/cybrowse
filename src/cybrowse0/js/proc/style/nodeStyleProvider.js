import {
	StyleProvider,
	MappingStyleProvider
} from '../../core/style';
import {
	nodeStyle
} from '../../etc';
const nodeStyleProvider = new StyleProvider("node", nodeStyle);

export default nodeStyleProvider;
