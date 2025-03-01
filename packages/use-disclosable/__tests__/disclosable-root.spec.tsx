import React from "react";
import { render, screen, renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DisclosableRoot } from "../lib/disclosable-root";
import { useDisclosable } from "../lib/use-disclosable";
import type { DisclosableInjectedProps } from "../lib/types";

const StubDisclosable: React.FC<{ testId: string, text?: string } & DisclosableInjectedProps> = ({ testId, text, closeDisclosable }) => {
    return (
        <div className={testId} data-testid={testId}>
            {text}
            <button data-testid="close-button" onClick={() => closeDisclosable()}>Close</button>
        </div>
    )
}

describe("disclosable-root", () => {
    beforeEach(() => {
        vi.useFakeTimers({ toFake: ["setTimeout"], shouldAdvanceTime: true });
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    describe("Open disclosable", () => {
        it("should open a disclosable", () => {
            const { result } = renderHook(() => useDisclosable());

            act(() => {
                result.current.open(StubDisclosable, { props: { testId: "first-disclosable" } });
            });
        });

        it("should render disclosable-root with previously opened disclosable", () => {
            render(<DisclosableRoot />)

            expect(screen.getByTestId("first-disclosable")).toBeDefined();
        });

        it("should open an already opened disclosable", () => {
            const { result } = renderHook(() => useDisclosable());

            act(() => {
                result.current.open(StubDisclosable, { props: { testId: "first-disclosable" } });
            });
        });

        it("should render disclosable-root with previously opened disclosable", () => {
            render(<DisclosableRoot />)

            expect(screen.getAllByTestId("first-disclosable")).toHaveLength(1);

            expect(screen.getByTestId("first-disclosable")).toBeDefined();
        });

        it("should open a disclosable with a custom identifier", () => {
            const { result } = renderHook(() => useDisclosable());
            act(() => {
                result.current.open(StubDisclosable, { props: { testId: "second-disclosable" }, identifier: "custom-identifier" });
            });
        });

        it("should render disclosable-root with previously opened disclosable", () => {
            render(<DisclosableRoot />)


            expect(screen.getAllByTestId("first-disclosable")).toHaveLength(1);
            expect(screen.getByTestId("first-disclosable")).toBeDefined();

            expect(screen.getAllByTestId("second-disclosable")).toHaveLength(1);
            expect(screen.getByTestId("second-disclosable")).toBeDefined();
        });
    });

    describe("Set disclosable props", () => {
        it("should set props on an unknown disclosable identifier", () => {
            const { result } = renderHook(() => useDisclosable());
            act(() => {
                result.current.setProps("unknown-disclosable", { text: "hello" });
            });
        });

        it("should set props on a disclosable using component name", () => {
            const { result } = renderHook(() => useDisclosable());
            act(() => {
                result.current.setProps(StubDisclosable, { text: "hello" });
            });
        });

        it("should render disclosable-root with previously opened disclosable including new props", () => {
            render(<DisclosableRoot />)

            expect(screen.getByTestId("first-disclosable")).toBeDefined();
            expect(screen.getByTestId("first-disclosable").textContent).toContain("hello");

            expect(screen.getAllByTestId("second-disclosable")).toHaveLength(1);
            expect(screen.getByTestId("second-disclosable")).toBeDefined();
        });
    });

    describe("Close disclosable", () => {
        it("should close a disclosable", () => {
            const { result } = renderHook(() => useDisclosable());
            act(() => {
                result.current.close(StubDisclosable);
            });

            act(() => {
                vi.runAllTimers();
            });
        });

        it("should render disclosable-root without previously closed disclosable", () => {
            render(<DisclosableRoot />)

            expect(screen.queryByTestId("first-disclosable")).toBeNull();

            expect(screen.getAllByTestId("second-disclosable")).toHaveLength(1);
            expect(screen.getByTestId("second-disclosable")).toBeDefined();
        });

        it("should close a disclosable already closed", () => {
            const { result } = renderHook(() => useDisclosable());
            act(() => {
                result.current.close(StubDisclosable);
            });
        });

        it("should render disclosable-root without previously closed disclosable", () => {
            render(<DisclosableRoot />)


            expect(screen.queryByTestId("first-disclosable")).toBeNull();

            expect(screen.getAllByTestId("second-disclosable")).toHaveLength(1);
            expect(screen.getByTestId("second-disclosable")).toBeDefined();
        });

        it("should close a disclosable through injected props", () => {
            const { result } = renderHook(() => useDisclosable());

            act(() => {
                result.current.open(StubDisclosable, { props: { testId: "disclosable-injected-props" } });
            });

            expect(screen.queryByTestId("disclosable-injected-props")).toBeDefined();

            screen.queryByTestId("close-button")?.click();

            act(() => {
                vi.runAllTimers();
            });

            expect(screen.queryByTestId("disclosable-injected-props")).toBeNull();
        });
    });

    describe("Close all disclosables", () => {
        it("should close all disclosables", () => {
            const { result } = renderHook(() => useDisclosable());
            act(() => {
                result.current.closeAll();
            });

            act(() => {
                vi.runAllTimers();
            });
        });

        it("should render disclosable-root without previously closed disclosable", () => {
            render(<DisclosableRoot />)

            expect(screen.queryByTestId("first-disclosable")).toBeNull();
            expect(screen.queryByTestId("second-disclosable")).toBeNull();
        });
    });

    describe("Open disclosable with replace option", () => {
        it("should open a disclosable with replace option", () => {
            const { result } = renderHook(() => useDisclosable());
            act(() => {
                result.current.open(StubDisclosable, { props: { testId: "first-disclosable" }, replace: true });
            });
        });

        it("should open same disclosable with replace option", () => {
            const { result } = renderHook(() => useDisclosable());
            act(() => {
                result.current.open(StubDisclosable, { props: { testId: "first-disclosable-replaced" }, replace: true });
            });
        });

        it("should render disclosable-root with previously opened disclosable", () => {
            const { container } = render(<DisclosableRoot />)

            expect(container.getElementsByClassName("first-disclosable")).toHaveLength(0);
            expect(screen.getByTestId("first-disclosable-replaced")).toBeDefined();
        });
    })
})