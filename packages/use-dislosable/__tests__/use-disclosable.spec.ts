
import { memo } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDisclosable } from '../lib/use-disclosable';

const StubDisclosable: React.FC<unknown> = () => {
    return undefined
}

describe('useDisclosable', () => {
    beforeEach(() => {
        vi.useFakeTimers({ toFake: ["setTimeout"], shouldAdvanceTime: true });
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it('should render hook', () => {
        const { result } = renderHook(() => useDisclosable());
        expect(result.current.open).toBeTypeOf('function')
        expect(result.current.close).toBeTypeOf('function')
        expect(result.current.closeAll).toBeTypeOf('function')
        expect(result.current.setProps).toBeTypeOf('function')
        expect(result.current.disclosables).toMatchObject({})
    });

    it("should call open on a disclosable", () => {
        const { result } = renderHook(() => useDisclosable());
        result.current.open(StubDisclosable);
    });

    it("should list disclosables and have previously opened disclosable", () => {
        const { result } = renderHook(() => useDisclosable());

        expect(result.current.disclosables).to.have.property(StubDisclosable.name)
        expect(result.current.disclosables[StubDisclosable.name]).to.be.an('object')

        expect(result.current.disclosables[StubDisclosable.name]).to.have.property('component').deep.equal(memo(StubDisclosable))

        expect(result.current.disclosables[StubDisclosable.name]).to.have.property('props').to.be.an('object')
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('isDisclosableOpen', true)
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('disclosableIndex', 1)
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('closeDisclosable').to.be.a('function')
    });

    it("should call open on a disclosable with a custom identifier", () => {
        const { result } = renderHook(() => useDisclosable());
        result.current.open(StubDisclosable, { identifier: "custom-identifier" });
    });


    it("should list disclosables and have previously opened disclosable", () => {
        const { result } = renderHook(() => useDisclosable());

        expect(result.current.disclosables).to.have.property(StubDisclosable.name)
        expect(result.current.disclosables[StubDisclosable.name]).to.be.an('object')

        expect(result.current.disclosables[StubDisclosable.name]).to.have.property('component').deep.equal(memo(StubDisclosable))

        expect(result.current.disclosables[StubDisclosable.name]).to.have.property('props').to.be.an('object')
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('isDisclosableOpen', true)
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('disclosableIndex', 1)
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('closeDisclosable').to.be.a('function')

        expect(result.current.disclosables["custom-identifier"]).to.be.an('object')

        expect(result.current.disclosables["custom-identifier"]).to.have.property('component').deep.equal(memo(StubDisclosable))

        expect(result.current.disclosables["custom-identifier"]).to.have.property('props').to.be.an('object')
        expect(result.current.disclosables["custom-identifier"].props).to.have.property('isDisclosableOpen', true)
        expect(result.current.disclosables["custom-identifier"].props).to.have.property('disclosableIndex', 2)
        expect(result.current.disclosables["custom-identifier"].props).to.have.property('closeDisclosable').to.be.a('function')
    });

    it("should set props on an unknown disclosable identifier", () => {
        const { result } = renderHook(() => useDisclosable());
        result.current.setProps("unknown-disclosable", { test: "test" });

        expect(result.current.disclosables).to.not.have.property("unknown-disclosable")
    });

    it("should set props on a disclosable using component name", () => {
        const { result } = renderHook(() => useDisclosable());
        result.current.setProps(StubDisclosable, { test: "test" });

        expect(result.current.disclosables[StubDisclosable.name]).to.have.property('props').to.be.an('object')
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('isDisclosableOpen', true)
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('disclosableIndex', 1)
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('closeDisclosable').to.be.a('function')
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('test', 'test')
    });

    it("should set props on a disclosable using custom identifier", () => {
        const { result } = renderHook(() => useDisclosable());
        result.current.setProps("custom-identifier", { test: "test" });

        expect(result.current.disclosables["custom-identifier"]).to.have.property('props').to.be.an('object')
        expect(result.current.disclosables["custom-identifier"].props).to.have.property('isDisclosableOpen', true)
        expect(result.current.disclosables["custom-identifier"].props).to.have.property('disclosableIndex', 2)
        expect(result.current.disclosables["custom-identifier"].props).to.have.property('closeDisclosable').to.be.a('function')
        expect(result.current.disclosables["custom-identifier"].props).to.have.property('test', 'test')
    });

    it("should call close on an unknown disclosable", () => {
        const { result } = renderHook(() => useDisclosable());
        result.current.close("unknown-disclosable");

        expect(result.current.disclosables[StubDisclosable.name]).to.be.an('object')
        expect(result.current.disclosables["custom-identifier"]).to.be.an('object')
    });

    it("should call close on a disclosable using component name", () => {
        const { result } = renderHook(() => useDisclosable());
        result.current.close(StubDisclosable);

        expect(result.current.disclosables).to.have.property(StubDisclosable.name)
        expect(result.current.disclosables[StubDisclosable.name]).to.be.an('object')

        expect(result.current.disclosables[StubDisclosable.name]).to.have.property('props').to.be.an('object')
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('isDisclosableOpen', false)

        vi.runAllTimers();

        expect(result.current.disclosables).to.not.have.property(StubDisclosable.name)
    });

    it("should call close on a disclosable using a custom identifier", () => {
        const { result } = renderHook(() => useDisclosable());
        result.current.close("custom-identifier");

        expect(result.current.disclosables).to.have.property("custom-identifier")
        expect(result.current.disclosables["custom-identifier"]).to.be.an('object')

        expect(result.current.disclosables["custom-identifier"]).to.have.property('props').to.be.an('object')
        expect(result.current.disclosables["custom-identifier"].props).to.have.property('isDisclosableOpen', false)

        vi.runAllTimers();

        expect(result.current.disclosables).to.not.have.property("custom-identifier")
    });

    it("should open a previously closed disclosable", () => {
        const { result } = renderHook(() => useDisclosable());
        result.current.open(StubDisclosable);

        expect(result.current.disclosables).to.have.property(StubDisclosable.name)
        expect(result.current.disclosables[StubDisclosable.name]).to.be.an('object')

        expect(result.current.disclosables[StubDisclosable.name]).to.have.property('component').deep.equal(memo(StubDisclosable))

        expect(result.current.disclosables[StubDisclosable.name]).to.have.property('props').to.be.an('object')
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('isDisclosableOpen', true)
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('disclosableIndex', 3)
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('closeDisclosable').to.be.a('function')
    });

    it("should call closeAll", () => {
        const { result } = renderHook(() => useDisclosable());
        result.current.closeAll();

        expect(result.current.disclosables).to.have.property(StubDisclosable.name)
        expect(result.current.disclosables[StubDisclosable.name]).to.be.an('object')

        expect(result.current.disclosables[StubDisclosable.name]).to.have.property('props').to.be.an('object')
        expect(result.current.disclosables[StubDisclosable.name].props).to.have.property('isDisclosableOpen', false)

        vi.runAllTimers();

        expect(result.current.disclosables).to.not.have.property(StubDisclosable.name);
        expect(result.current.disclosables).toMatchObject({});
    });

})