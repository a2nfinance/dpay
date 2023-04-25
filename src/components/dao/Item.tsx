import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Collapse, theme } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import { DAO } from 'src/controller/dao/daoSlice';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.`

export const Item = (dao) => {
    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };
    const daoObj = dao.dao[1];
    return (
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          style={{ background: token.colorBgContainer }}
        >
          <Panel header={daoObj.title} key="1" style={panelStyle}>
            <p>{daoObj.description}</p>

            <ButtonGroup>
              <Button>View Detail</Button>
              <Button>Join this DAO</Button>
            </ButtonGroup>
          </Panel>
        </Collapse>
      );
}