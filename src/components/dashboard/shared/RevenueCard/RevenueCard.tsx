import {CardProps, Flex, Space, Typography} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import {Card} from "../../../index.ts";
import {green, red} from "@ant-design/colors"
import CountUp from "react-countup";

type Props = {
    title: string,
    value: string | number
    diff: number
} & CardProps

const RevenueCard = ({title, value, diff, ...others}: Props) => (
    <Card {...others}>
        <Flex vertical gap="large">
            <Typography.Text>{title}</Typography.Text>
            <Flex justify="space-between" align="center">
                <Typography.Title level={2} style={{margin: 0}}>
                    {typeof value === "number" ?
                        <>
                            $
                            <CountUp end={value}/>
                        </> :
                        <span>{value}</span>
                    }
                </Typography.Title>
                <Space style={{color: diff > 0 ? green[6] : red[5]}}>
                    {diff > 0 ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                    <Typography.Text
                        style={{
                            color: diff > 0 ? green[6] : red[5],
                            fontWeight: 500
                        }}
                    >
                        <CountUp end={diff}/>%
                    </Typography.Text>
                </Space>
            </Flex>
        </Flex>
    </Card>
);

export default RevenueCard;
