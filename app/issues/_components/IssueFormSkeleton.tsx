import { Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

const IssueFormSkeleton = () => {
  return (
    <div>


<Box className='max-w-xl'>

<Skeleton height="2rem"/>
<Skeleton height="20rem"/>



  
 </Box>

    </div>
  )
}

export default IssueFormSkeleton