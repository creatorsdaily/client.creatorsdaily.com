import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isMoment from 'dayjs/plugin/isMoment'
import badMutable from 'dayjs/plugin/badMutable'
import localeData from 'dayjs/plugin/localeData'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import weekYear from 'dayjs/plugin/weekYear'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(weekYear)
dayjs.extend(weekOfYear)
dayjs.extend(isMoment)
dayjs.extend(localeData)
dayjs.extend(badMutable)
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')
