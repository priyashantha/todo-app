describe('Todo App E2E', () => {
    it('adds 6 tasks and marks 1 task as done', () => {
        cy.visit('http://localhost:5173');

        const uid = Date.now();

        // Add 6 unique tasks safely
        Cypress._.times(6, (i) => {
            const num = i + 1;
            cy.get('input[placeholder="Task title"]').clear().type(`Task ${num} - ${uid}`);
            cy.get('textarea[placeholder="Task content"]').clear().type(`Content for task ${num}`);
            cy.get('button[type="submit"]').click();
            cy.contains(`Task ${num} - ${uid}`, { timeout: 10000 }).should('be.visible');
        });

        // Assert only 5 tasks visible
        cy.get('h3').should('have.length', 5);

        //  2 seconds pause for visual confirmation
        cy.wait(2000);

        // Mark last task as done
        cy.contains(`Task 6 - ${uid}`)
            .parent()
            .parent()
            .contains('Done')
            .click();

        // Wait for re-render
        cy.contains(`Task 6 - ${uid}`, { timeout: 2000 }).should('not.exist');
        cy.contains(`Task 5 - ${uid}`).should('be.visible');
        cy.contains(`Task 4 - ${uid}`).should('be.visible');
        cy.contains(`Task 3 - ${uid}`).should('be.visible');
        cy.contains(`Task 2 - ${uid}`).should('be.visible');
        cy.contains(`Task 1 - ${uid}`).should('be.visible');

        // Final check: 5 tasks visible
        cy.get('h3').should('have.length', 5);
    });
});


