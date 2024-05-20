import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from '@nextui-org/react'
import { Link as Route } from 'react-router-dom'
export default function CustomCard({ src, text, link, header, action }) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        {src}
        <div className="flex flex-col text-center justify-center w-full">
          <p className="text-md text-center">{header}</p>
          <p className="text-small text-default-500 text-center">{action}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{text}</p>
      </CardBody>
      <Divider />
      <CardFooter className="text-center w-full justify-center">
        <Link showAnchorIcon href={link}>
          {action}
        </Link>
      </CardFooter>
    </Card>
  )
}
//
