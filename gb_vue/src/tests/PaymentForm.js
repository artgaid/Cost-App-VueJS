// import Vuex from 'vuex'
// import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
// import AddPaymentForm from '../components/AddPaymentForm.vue'

// const LocalVue = createLocalVue()
// LocalVue.use(Vuex)

describe('PaymentForm', () => {
    let mutations
    let actions
    let getters
    let store

    beforeEach(() => {
        mutations = {
            addDataToPaymentList: jest.fn()
        }

        getters = {
            getCategories: jest.fn()
        }

        actions = {
            fetchCategoryList: jest.fn()
        }

        store = new Vuex.Store({
            mutations,
            actions,
            getters
        })
    })

    it('click mutations', async () => {
        const wrapper = shallowMount(AddPaymentForm, {
            store,
            LocalVue
        })

        const inputValue = wrapper.find('input[name=value]')
        inputValue.setValue('10')
        expect(wrapper.vm.value).toBe(10)

        wrapper.find('button').trigger('click')
        expect(mutations.addDataToPaymentList).toHaveBeenCalled()
    })
})