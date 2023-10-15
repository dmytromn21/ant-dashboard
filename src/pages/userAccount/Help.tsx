import {Button, Flex, Input, TabsProps, Typography} from "antd";
import {Card, FaqCollapse} from "../../components";
import {
    DollarOutlined,
    PullRequestOutlined,
    RocketOutlined,
    SettingOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import {createElement, useEffect, useState} from "react";
import * as _ from "lodash";
import FaqsData from "../../mocks/Faqs.json";
import {TitleProps} from "antd/es/typography/Title";

const {Text, Title} = Typography

const TOPICS = [
    {
        title: "get started",
        image: RocketOutlined
    },
    {
        title: "features",
        image: UnorderedListOutlined
    },
    {
        title: "billing",
        image: DollarOutlined
    },
    {
        title: "troubleshooting",
        image: SettingOutlined
    },
    {
        title: "integrations",
        image: PullRequestOutlined
    }
]

const OTHER_TOPICS = [
    {
        title: "Getting started guide",
        description: "Not sure where to start? Get going with our easy-to-follow beginner's guide to Antd Dashboard.",
        action: "Get started"
    },
    {
        title: "What's new",
        description: "All the upgrades and improvements that‘ll better help you organize it all.",
        action: "See what's new"
    },
    {
        title: "Known issues",
        description: "The bugs with fixes in the works. Check here before shooting us a message.",
        action: "Consult the list"
    },
]

const TITLE_PROPS: TitleProps = {
    style: {
        marginBottom: 0,
        textAlign: "center"
    },
    level: 3
}

const UserProfileHelpPage = () => {
    const [activeTabKey, setActiveTabKey] = useState<string>('app');
    const [tabList, setTabList] = useState<TabsProps["items"]>([])

    const onTabChange = (key: string) => {
        setActiveTabKey(key)
    };

    useEffect(() => {
        const tabs = _.chain(FaqsData)
            .orderBy("category")
            .uniqBy("category")
            .map(d => (
                {
                    key: d.category,
                    label: d.category,
                }
            ))
            .value()

        console.log(tabs)
        setTabList(tabs)
    }, []);

    return (
        <div>
            <Flex vertical gap="large">
                <Flex vertical gap="middle">
                    <Title {...TITLE_PROPS}>How can we help?</Title>
                    <Input.Search placeholder="search articles..."/>
                </Flex>
                <Flex gap="middle">
                    {TOPICS.map(t =>
                        <Card
                            hoverable
                            style={{
                                width: "25%",
                                textAlign: "center"
                            }}
                        >
                            <Flex vertical gap="middle">
                                {createElement(t.image, {style: {fontSize: "1.5rem", margin: "auto"}})}
                                <Text style={{textTransform: "capitalize"}}>{t.title}</Text>
                            </Flex>
                        </Card>
                    )}
                </Flex>
                <Flex gap="middle">
                    {OTHER_TOPICS.map(t =>
                        <Card
                            key={t.title}
                            title={t.title}
                            actions={[<Button>{t.action}</Button>]}
                        >
                            <Text>{t.description}</Text>
                        </Card>
                    )}
                </Flex>
                <Title {...TITLE_PROPS}>
                    Frequently asked questions
                </Title>
                <Text>Our website has a list of questions and answers that aim to provide clarity on a particular
                    subject. If you need assistance, feel free to check out our FAQs.</Text>
                <Card
                    tabList={tabList}
                    activeTabKey={activeTabKey}
                    tabBarExtraContent={<Button type="link">Go to FAQs</Button>}
                    onTabChange={onTabChange}
                    tabProps={{
                        size: 'middle',
                    }}
                >
                    <FaqCollapse
                        bordered={false}
                        items={_.chain(FaqsData)
                            .filter(d => d.category === activeTabKey)
                            .slice(0, 5)
                            .map((i) => ({
                                label: `${i.question.slice(0, 50)}`,
                                children: i.answer
                            }))
                            .value()
                        }
                    />
                </Card>
            </Flex>
        </div>
    );
};

export default UserProfileHelpPage;