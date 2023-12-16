import { PrismaClient } from "@prisma/client";
import "@testing-library/jest-dom";
import React from "react";
import { initialize } from "@/tests/fabbrica";

const prisma = new PrismaClient();

initialize({ prisma });

global.React = React;
