import styled from 'styled-components'
import { Button, Space } from 'antd'
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined'
import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined'
import noop from 'lodash/noop'
import { blue } from '../libs/colors'

const Container = styled.div`
display: flex;
padding: 12px 16px;
background: #FAFAFF;
border-top: 1px solid #F0F0F0;
justify-content: space-between;
align-items: center;
background-image: repeating-linear-gradient(60deg, rgba(255,255,255,.8), rgba(255,255,255,.8) 15px, 
                    transparent 0,transparent 30px);
.ant-btn:not([disabled]) {
  background: rgba(89, 156, 243, 0.15);
  color: ${blue};
  &:hover {
    background: rgba(89, 156, 243, 0.2);
  }
}
.ant-btn[disabled] {
  background: rgba(0, 0, 0, 0.05);
}
`

const OptionToolbar = ({ value, disabled = false, onVote = noop }) => {
  return (
    <Container>
      <Space>
        <Button
          type='text' disabled={disabled} icon={<CaretUpOutlined />} onClick={() => onVote(true)}
        >推荐 {value}
        </Button>
        <Button
          type='text' disabled={disabled} icon={<CaretDownOutlined />} onClick={() => onVote(false)}
        />
      </Space>
    </Container>
  )
}

export default OptionToolbar
